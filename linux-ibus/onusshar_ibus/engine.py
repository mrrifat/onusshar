#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Onusshar IBus Engine Implementation
"""

import gi
gi.require_version('IBus', '1.0')
from gi.repository import IBus, GLib

from .transliterator import PhoneticTransliterator
from .suggestions import SuggestionProvider

# Key codes
KEYCODE_RETURN = 0xFF0D
KEYCODE_ESCAPE = 0xFF1B
KEYCODE_BACKSPACE = 0xFF08
KEYCODE_DELETE = 0xFFFF
KEYCODE_SPACE = 0x20

class OnussharEngine(IBus.Engine):
    """
    Onusshar IBus Engine
    Handles keyboard events and provides Bengali phonetic input
    """

    __gtype_name__ = 'OnussharEngine'

    def __init__(self):
        super(OnussharEngine, self).__init__()

        # Initialize transliterator and suggestion provider
        self.transliterator = PhoneticTransliterator()
        self.suggestion_provider = SuggestionProvider()

        # Composition state
        self.preedit_string = ""
        self.lookup_table = IBus.LookupTable.new(page_size=9, cursor_pos=0, cursor_visible=True, round=True)

        # Engine properties
        self.prop_list = IBus.PropList()
        self.__setup_properties()

    def __setup_properties(self):
        """Setup engine properties"""
        # Mode property (currently unused, but can be extended)
        mode_prop = IBus.Property(
            key="InputMode",
            type=IBus.PropType.NORMAL,
            label=IBus.Text.new_from_string("Mode"),
            icon="",
            tooltip=IBus.Text.new_from_string("Input Mode"),
            sensitive=True,
            visible=True,
            state=IBus.PropState.UNCHECKED,
            sub_props=None
        )
        self.prop_list.append(mode_prop)

    def do_process_key_event(self, keyval, keycode, state):
        """
        Process key events
        Returns True if the event was handled
        """
        # Ignore release events
        is_press = ((state & IBus.ModifierType.RELEASE_MASK) == 0)
        if not is_press:
            return False

        # Check for modifiers
        mod_mask = state & (IBus.ModifierType.CONTROL_MASK | IBus.ModifierType.MOD1_MASK)
        if mod_mask != 0:
            # Don't process keys with Ctrl/Alt
            return False

        # Handle special keys
        if keyval == KEYCODE_RETURN:
            return self.__commit_string()

        elif keyval == KEYCODE_ESCAPE:
            return self.__cancel_composition()

        elif keyval == KEYCODE_BACKSPACE:
            return self.__backspace()

        elif keyval == KEYCODE_SPACE:
            return self.__handle_space()

        # Handle number keys (1-9) for candidate selection
        elif keyval >= ord('1') and keyval <= ord('9'):
            if self.preedit_string:
                return self.__select_candidate(keyval - ord('1'))

        # Handle printable characters
        elif keyval < 128:
            char = chr(keyval)
            if char.isprintable():
                return self.__handle_character(char)

        return False

    def __handle_character(self, char):
        """Handle a printable character"""
        self.preedit_string += char

        # Convert using transliterator
        bengali_text = self.transliterator.convert(self.preedit_string)

        # Update preedit
        self.__update_preedit(bengali_text)

        # Get suggestions
        suggestions = self.suggestion_provider.get_suggestions(self.preedit_string)

        # Update lookup table
        self.__update_lookup_table(suggestions)

        return True

    def __handle_space(self):
        """Handle space key"""
        if self.preedit_string:
            # Commit current composition and add space
            bengali_text = self.transliterator.convert(self.preedit_string)
            self.commit_text(IBus.Text.new_from_string(bengali_text + " "))
            self.preedit_string = ""
            self.__hide_lookup_table()
            self.__hide_preedit_text()
            return True
        return False

    def __backspace(self):
        """Handle backspace"""
        if self.preedit_string:
            self.preedit_string = self.preedit_string[:-1]

            if self.preedit_string:
                bengali_text = self.transliterator.convert(self.preedit_string)
                self.__update_preedit(bengali_text)

                suggestions = self.suggestion_provider.get_suggestions(self.preedit_string)
                self.__update_lookup_table(suggestions)
            else:
                self.__hide_preedit_text()
                self.__hide_lookup_table()

            return True
        return False

    def __commit_string(self):
        """Commit the current composition"""
        if self.preedit_string:
            bengali_text = self.transliterator.convert(self.preedit_string)
            self.commit_text(IBus.Text.new_from_string(bengali_text))
            self.preedit_string = ""
            self.__hide_lookup_table()
            self.__hide_preedit_text()
            return True
        return False

    def __cancel_composition(self):
        """Cancel the current composition"""
        if self.preedit_string:
            self.preedit_string = ""
            self.__hide_preedit_text()
            self.__hide_lookup_table()
            return True
        return False

    def __select_candidate(self, index):
        """Select a candidate from lookup table"""
        if index < self.lookup_table.get_number_of_candidates():
            candidate = self.lookup_table.get_candidate(index)
            self.commit_text(candidate)
            self.preedit_string = ""
            self.__hide_lookup_table()
            self.__hide_preedit_text()
            return True
        return False

    def __update_preedit(self, text):
        """Update preedit text"""
        attrs = IBus.AttrList()
        attrs.append(IBus.attr_underline_new(IBus.AttrUnderline.SINGLE, 0, len(text)))

        ibus_text = IBus.Text.new_from_string(text)
        ibus_text.set_attributes(attrs)

        self.update_preedit_text(ibus_text, len(text), True)

    def __hide_preedit_text(self):
        """Hide preedit text"""
        self.update_preedit_text(IBus.Text.new_from_string(""), 0, False)

    def __update_lookup_table(self, suggestions):
        """Update lookup table with suggestions"""
        self.lookup_table.clear()

        for i, suggestion in enumerate(suggestions[:9]):
            text = f"{i + 1}. {suggestion}"
            self.lookup_table.append_candidate(IBus.Text.new_from_string(text))

        if suggestions:
            self.update_lookup_table(self.lookup_table, True)
        else:
            self.__hide_lookup_table()

    def __hide_lookup_table(self):
        """Hide lookup table"""
        self.hide_lookup_table()

    def do_focus_in(self):
        """Handle focus in"""
        self.register_properties(self.prop_list)

    def do_focus_out(self):
        """Handle focus out"""
        self.__cancel_composition()

    def do_reset(self):
        """Reset engine"""
        self.__cancel_composition()

    def do_page_up(self):
        """Handle page up in lookup table"""
        if self.lookup_table.page_up():
            self.update_lookup_table(self.lookup_table, True)
            return True
        return False

    def do_page_down(self):
        """Handle page down in lookup table"""
        if self.lookup_table.page_down():
            self.update_lookup_table(self.lookup_table, True)
            return True
        return False

    def do_cursor_up(self):
        """Handle cursor up in lookup table"""
        if self.lookup_table.cursor_up():
            self.update_lookup_table(self.lookup_table, True)
            return True
        return False

    def do_cursor_down(self):
        """Handle cursor down in lookup table"""
        if self.lookup_table.cursor_down():
            self.update_lookup_table(self.lookup_table, True)
            return True
        return False
