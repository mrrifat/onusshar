#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Suggestion Provider for Onusshar IBus
Provides word suggestions and autocomplete
"""

from .transliterator import PhoneticTransliterator

class SuggestionProvider:
    """Provide suggestions based on dictionary and phonetic conversion"""

    def __init__(self):
        self.transliterator = PhoneticTransliterator()

        # Common Bengali words (subset for demo)
        # In production, this would load from @onusshar/dictionary
        self.common_words = {
            'ami': ['আমি'],
            'tumi': ['তুমি'],
            'apni': ['আপনি'],
            'bangla': ['বাংলা'],
            'bhasha': ['ভাষা'],
            'bhalo': ['ভালো', 'ভাল'],
            'kharap': ['খারাপ'],
            'shundor': ['সুন্দর'],
            'dhonnobad': ['ধন্যবাদ'],
            'nomoshkar': ['নমস্কার'],
            'hyan': ['হ্যাঁ'],
            'na': ['না'],
            'kemon': ['কেমন'],
            'acho': ['আছো', 'আছ'],
            'achen': ['আছেন'],
            'kothay': ['কোথায়'],
            'ki': ['কী', 'কি'],
            'ke': ['কে'],
            'kobe': ['কবে'],
            'kokhon': ['কখন'],
            'kibhabe': ['কীভাবে'],
            'bhalobasha': ['ভালোবাসা', 'ভালবাসা'],
            'bhalobashi': ['ভালোবাসি', 'ভালবাসি'],
        }

    def get_suggestions(self, latin_input):
        """
        Get suggestions for Latin input

        Args:
            latin_input (str): Latin text input

        Returns:
            list: List of Bengali suggestions
        """
        if not latin_input:
            return []

        suggestions = []

        # 1. Exact dictionary match
        if latin_input.lower() in self.common_words:
            suggestions.extend(self.common_words[latin_input.lower()])

        # 2. Prefix matches (autocomplete)
        for key, words in self.common_words.items():
            if key.startswith(latin_input.lower()) and key != latin_input.lower():
                suggestions.extend(words)

        # 3. Phonetic conversion (always include as fallback)
        phonetic = self.transliterator.convert(latin_input)
        if phonetic and phonetic not in suggestions:
            # Add phonetic conversion at the beginning
            suggestions.insert(0, phonetic)

        # Remove duplicates while preserving order
        seen = set()
        unique_suggestions = []
        for suggestion in suggestions:
            if suggestion not in seen:
                seen.add(suggestion)
                unique_suggestions.append(suggestion)

        # Limit to 9 suggestions (matching IBus page size)
        return unique_suggestions[:9]

    def add_custom_word(self, latin, bengali):
        """
        Add a custom word to the dictionary

        Args:
            latin (str): Latin phonetic spelling
            bengali (str): Bengali word
        """
        if latin.lower() not in self.common_words:
            self.common_words[latin.lower()] = []
        if bengali not in self.common_words[latin.lower()]:
            self.common_words[latin.lower()].append(bengali)

    def learn_word(self, bengali_word):
        """
        Learn from user input (for future ML-based suggestions)

        Args:
            bengali_word (str): Word that user committed
        """
        # Placeholder for learning functionality
        # Future: track frequency, update rankings
        pass
