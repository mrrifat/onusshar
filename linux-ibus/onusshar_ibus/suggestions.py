#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Suggestion Provider for Onusshar IBus
Provides word suggestions and autocomplete using comprehensive dictionary (1500+ words)
"""

from .transliterator import PhoneticTransliterator
from . import dictionary_data

class SuggestionProvider:
    """
    Provide suggestions based on comprehensive dictionary and phonetic conversion
    Uses 1500+ word Bengali dictionary with frequency-based ranking
    """

    def __init__(self):
        self.transliterator = PhoneticTransliterator()

        # Load comprehensive dictionary (1500+ words)
        self.dictionary = dictionary_data.DICTIONARY

        # User learning: track word frequency
        self.user_word_frequency = {}

        # Statistics
        self.total_words = dictionary_data.TOTAL_WORDS

    def get_suggestions(self, latin_input):
        """
        Get suggestions for Latin input using comprehensive dictionary

        Args:
            latin_input (str): Latin text input

        Returns:
            list: List of Bengali suggestions (up to 9)
        """
        if not latin_input:
            return []

        lower_input = latin_input.lower()
        suggestions = []
        seen = set()

        # 1. Exact dictionary match (highest priority)
        if lower_input in self.dictionary:
            for word in self.dictionary[lower_input]:
                if word not in seen:
                    suggestions.append(word)
                    seen.add(word)

        # 2. Prefix matches (autocomplete) - sorted by key length (shorter first)
        prefix_matches = []
        for key, words in self.dictionary.items():
            if key.startswith(lower_input) and key != lower_input:
                for word in words:
                    if word not in seen:
                        prefix_matches.append((len(key), word))
                        seen.add(word)

        # Sort by key length and add to suggestions
        prefix_matches.sort(key=lambda x: x[0])
        for _, word in prefix_matches:
            suggestions.append(word)
            if len(suggestions) >= 8:  # Leave room for phonetic
                break

        # 3. Phonetic conversion (always include as fallback)
        phonetic = self.transliterator.convert(latin_input)
        if phonetic and phonetic not in seen:
            # Insert phonetic conversion at position 1 (after exact match if exists)
            insert_pos = 1 if len(suggestions) > 0 and lower_input in self.dictionary else 0
            suggestions.insert(insert_pos, phonetic)

        # Limit to 9 suggestions (matching IBus page size)
        return suggestions[:9]

    def add_custom_word(self, latin, bengali):
        """
        Add a custom word to the dictionary

        Args:
            latin (str): Latin phonetic spelling
            bengali (str): Bengali word
        """
        if latin.lower() not in self.dictionary:
            self.dictionary[latin.lower()] = []
        if bengali not in self.dictionary[latin.lower()]:
            self.dictionary[latin.lower()].append(bengali)

    def learn_word(self, bengali_word):
        """
        Learn from user input - track word frequency for personalization

        Args:
            bengali_word (str): Word that user committed
        """
        if bengali_word in self.user_word_frequency:
            self.user_word_frequency[bengali_word] += 1
        else:
            self.user_word_frequency[bengali_word] = 1

    def get_stats(self):
        """
        Get dictionary statistics

        Returns:
            dict: Statistics about the dictionary
        """
        return {
            'total_words': self.total_words,
            'dictionary_entries': len(self.dictionary),
            'user_learned_words': len(self.user_word_frequency),
        }
