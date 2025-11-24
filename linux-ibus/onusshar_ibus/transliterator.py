#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Phonetic Transliterator for Bengali
Implements the same phonetic rules as @onusshar/core
"""

class PhoneticTransliterator:
    """Convert Latin phonetic input to Bengali script"""

    def __init__(self):
        # Phonetic mapping rules (matches @onusshar/core mappings)
        # Priority: longer patterns first
        self.mappings = self._build_mappings()

    def _build_mappings(self):
        """Build phonetic mapping dictionary"""
        mappings = [
            # Vowels (2-char first for longest match)
            ('oo', 'উ'), ('uu', 'ঊ'), ('ou', 'ঔ'), ('au', 'ঔ'),
            ('ee', 'ঈ'), ('ii', 'ঈ'), ('oi', 'ঐ'),

            # Consonants (2-char)
            ('kh', 'খ'), ('gh', 'ঘ'), ('ng', 'ঙ'),
            ('ch', 'চ'), ('chh', 'ছ'), ('jh', 'ঝ'),
            ('th', 'থ'), ('dh', 'ধ'),
            ('ph', 'ফ'), ('bh', 'ভ'),
            ('sh', 'শ'), ('Sh', 'ষ'),
            ('Th', 'ঠ'), ('Dh', 'ঢ'), ('Rh', 'ঢ়'),

            # Special conjuncts
            ('nga', 'ঙ্গা'), ('ngo', 'ঙ্গো'),
            ('kSh', 'ক্ষ'),

            # Single vowels
            ('a', 'আ'), ('i', 'ই'), ('u', 'উ'),
            ('e', 'এ'), ('o', 'ও'),
            ('A', 'অ্যা'), ('I', 'ঈ'), ('U', 'ঊ'),
            ('E', 'ঐ'), ('O', 'ও'),

            # Single consonants
            ('k', 'ক'), ('g', 'গ'),
            ('c', 'চ'), ('j', 'জ'),
            ('t', 'ত'), ('d', 'দ'), ('n', 'ন'),
            ('p', 'প'), ('b', 'ব'), ('m', 'ম'),
            ('r', 'র'), ('l', 'ল'), ('s', 'স'), ('h', 'হ'),
            ('y', 'য়'), ('Y', 'য'), ('w', 'ও'),

            # Retroflexes
            ('T', 'ট'), ('D', 'ড'), ('N', 'ণ'), ('R', 'ড়'),

            # Special characters
            ('Ng', 'ং'), ('NG', 'ং'),
            ('H', 'ঃ'), ('~', 'ঁ'),
            ('^', '্'),

            # Punctuation
            ('..', '।'),
        ]

        return mappings

    def convert(self, text):
        """
        Convert Latin text to Bengali using phonetic rules

        Args:
            text (str): Latin input text

        Returns:
            str: Bengali output text
        """
        if not text:
            return ""

        result = []
        i = 0

        while i < len(text):
            matched = False

            # Try to match from longest to shortest
            for pattern, bengali in self.mappings:
                pattern_len = len(pattern)
                if i + pattern_len <= len(text):
                    # Case-sensitive match
                    if text[i:i + pattern_len] == pattern:
                        result.append(bengali)
                        i += pattern_len
                        matched = True
                        break

            if not matched:
                # No match, keep the character as-is
                result.append(text[i])
                i += 1

        return ''.join(result)

    def convert_with_kars(self, text):
        """
        Convert with smart kar (vowel sign) placement

        This is a simplified version. Full implementation would:
        1. Track consonants vs vowels
        2. Convert independent vowels to dependent forms (kars) after consonants
        3. Handle conjuncts properly
        """
        # For now, use basic conversion
        # Future enhancement: implement smart kar logic from @onusshar/core
        return self.convert(text)
