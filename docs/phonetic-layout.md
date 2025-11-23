# Onusshar Phonetic Layout

Complete reference for Bengali phonetic typing with Onusshar.

## Table of Contents

1. [Overview](#overview)
2. [Vowels](#vowels)
3. [Consonants](#consonants)
4. [Vowel Signs (Kars)](#vowel-signs-kars)
5. [Special Characters](#special-characters)
6. [Numbers](#numbers)
7. [Punctuation](#punctuation)
8. [Conjuncts](#conjuncts)
9. [Smart Rules](#smart-rules)
10. [Escape Sequences](#escape-sequences)
11. [Examples](#examples)

---

## Overview

Onusshar uses a **phonetic layout** where you type how words sound in Roman/Latin letters, and they are converted to Bengali script.

**Basic Principle**: Type as it sounds in English → Get Bengali

Example:
- `bangla` → বাঙলা
- `ami` → আমি
- `tumi kemon acho` → তুমি কেমোন আছো

---

## Vowels

### Independent Vowels

Independent vowels appear at the beginning of a word or after another vowel.

| Input | Output | Unicode | Name | Example |
|-------|--------|---------|------|---------|
| `a` | আ | U+0986 | আ-কার | `ami` → আমি |
| `i` | ই | U+0987 | হ্রস্ব ই | `iti` → ইতি |
| `ii` | ঈ | U+0988 | দীর্ঘ ই | `iishwar` → ঈশ্বর |
| `ee` | ঈ | U+0988 | দীর্ঘ ই | `eesha` → ঈষা |
| `u` | উ | U+0989 | হ্রস্ব উ | `upor` → উপোর |
| `uu` | ঊ | U+098A | দীর্ঘ উ | `uurdhwo` → ঊর্ধ্বো |
| `oo` | উ | U+0989 | হ্রস্ব উ (alt) | `oon` → উন |
| `e` | এ | U+098F | এ | `ek` → এক |
| `oi` | ঐ | U+0990 | ঐ | `oikko` → ঐক্য |
| `o` | ও | U+0993 | ও | `onek` → ওনেক |
| `ou` | ঔ | U+0994 | ঔ | `oushod` → ঔষোদ |
| `au` | ঔ | U+0994 | ঔ (alt) | `aushod` → ঔষোদ |

### Inherent Vowel

Bengali consonants have an inherent "অ" (short 'a') sound by default.

Example:
- `k` → ক (pronounced "ka")
- `khabo` → খাবো

### Special Vowel

| Input | Output | Unicode | Name | Example |
|-------|--------|---------|------|---------|
| `rri` | ঋ | U+098B | ঋ | `rritwik` → ঋত্বিক |

---

## Consonants

### Velar (Gutturals)

| Input | Output | Unicode | Name | Example |
|-------|--------|---------|------|---------|
| `k` | ক | U+0995 | কা | `kal` → কাল |
| `kh` | খ | U+0996 | খা | `khub` → খুব |
| `g` | গ | U+0997 | গা | `gan` → গান |
| `gh` | ঘ | U+0998 | ঘা | `ghor` → ঘোর |
| `ng` | ঙ | U+0999 | ঙা | `angul` → আঙুল |

### Palatal

| Input | Output | Unicode | Name | Example |
|-------|--------|---------|------|---------|
| `c` | চ | U+099A | চা | `chol` → চল |
| `ch` | চ | U+099A | চা | `chal` → চাল |
| `chh` | ছ | U+099B | ছা | `chhabhi` → ছাভি |
| `Ch` | ছ | U+099B | ছা (alt) | `Chaya` → ছায়া |
| `j` | জ | U+099C | জা | `jol` → জল |
| `jh` | ঝ | U+099D | ঝা | `jhar` → ঝার |
| `nya` | ঞ | U+099E | ঞা | `gyan` → জ্ঞান |

### Retroflex

| Input | Output | Unicode | Name | Example |
|-------|--------|---------|------|---------|
| `T` | ট | U+099F | টা | `TaTka` → টাটকা |
| `Th` | ঠ | U+09A0 | ঠা | `Thanda` → ঠান্ডা |
| `D` | ড | U+09A1 | ডা | `Dab` → ডাব |
| `Dh` | ঢ | U+09A2 | ঢা | `Dhol` → ঢোল |
| `N` | ণ | U+09A3 | ণা | `puroNo` → পুরোণো |

### Flapped

| Input | Output | Unicode | Name | Example |
|-------|--------|---------|------|---------|
| `R` | ড় | U+09DC | ড়া | `baRi` → বাড়ি |
| `Rh` | ঢ় | U+09DD | ঢ়া | `gaRhi` → গাঢ়ি |

### Dental

| Input | Output | Unicode | Name | Example |
|-------|--------|---------|------|---------|
| `t` | ত | U+09A4 | তা | `tumi` → তুমি |
| `th` | থ | U+09A5 | থা | `theke` → থেকে |
| `d` | দ | U+09A6 | দা | `din` → দিন |
| `dh` | ধ | U+09A7 | ধা | `dhan` → ধান |
| `n` | ন | U+09A8 | না | `nam` → নাম |

### Labial

| Input | Output | Unicode | Name | Example |
|-------|--------|---------|------|---------|
| `p` | প | U+09AA | পা | `pakhi` → পাখি |
| `ph` | ফ | U+09AB | ফা | `phool` → ফুল |
| `f` | ফ | U+09AB | ফা (alt) | `fan` → ফান |
| `b` | ব | U+09AC | বা | `boi` → বই |
| `bh` | ভ | U+09AD | ভা | `bhalo` → ভালো |
| `v` | ভ | U+09AD | ভা (alt) | `van` → ভান |
| `m` | ম | U+09AE | মা | `ma` → মা |

### Approximants

| Input | Output | Unicode | Name | Example |
|-------|--------|---------|------|---------|
| `y` | য় | U+09AF় | য়া (antastha ya) | `maya` → ময়া |
| `Y` | য | U+09AF | যা (ja-phala) | `jYoti` → জ্যোতি |
| `r` | র | U+09B0 | রা | `rat` → রাত |
| `l` | ল | U+09B2 | লা | `lok` → লোক |
| `w` | ও | U+0993 | ওয়া | `web` → ওএব |

### Sibilants

| Input | Output | Unicode | Name | Example |
|-------|--------|---------|------|---------|
| `sh` | শ | U+09B6 | শা (palatal) | `shuru` → শুরু |
| `Sh` | ষ | U+09B7 | ষা (retroflex) | `Shash` → ষাষ |
| `s` | স | U+09B8 | সা (dental) | `sat` → সাত |

### Glottal

| Input | Output | Unicode | Name | Example |
|-------|--------|---------|------|---------|
| `h` | হ | U+09B9 | হা | `hat` → হাত |

---

## Vowel Signs (Kars)

When a vowel follows a consonant, it is represented as a **vowel sign** (kar) attached to the consonant.

### Automatic Conversion

Onusshar **automatically** converts independent vowels to vowel signs when they follow a consonant.

Example:
- `ka` → ক + আ → কা (ক + া-কার)

### Vowel Sign Table

| Input after consonant | Sign | Unicode | Name | Example |
|----------------------|------|---------|------|---------|
| `a` | া | U+09BE | আ-কার | `ka` → কা |
| `i` | ি | U+09BF | ই-কার | `ki` → কি |
| `ii` / `ee` | ী | U+09C0 | ঈ-কার | `kii` → কী |
| `u` | ু | U+09C1 | উ-কার | `ku` → কু |
| `uu` / `oo` | ূ | U+09C2 | ঊ-কার | `kuu` → কূ |
| `rri` | ৃ | U+09C3 | ঋ-কার | `krri` → কৃ |
| `e` | ে | U+09C7 | এ-কার | `ke` → কে |
| `oi` | ৈ | U+09C8 | ঐ-কার | `koi` → কৈ |
| `o` / `O` | ো | U+09CB | ও-কার | `ko` → কো |
| `ou` / `au` | ৌ | U+09CC | ঔ-কার | `kou` → কৌ |

### No Vowel (Hasanta)

To remove the inherent vowel, use **hasanta** (্):

| Input | Output | Unicode | Name | Example |
|-------|--------|---------|------|---------|
| `^` | ্ | U+09CD | হসন্ত/বিরাম | `k^` → ক্ |

---

## Special Characters

### Diacritical Marks

| Input | Output | Unicode | Name | Example |
|-------|--------|---------|------|---------|
| `~` | ঁ | U+0981 | চন্দ্রবিন্দু | `ha~s` → হাঁস |
| `Ng` / `NG` | ং | U+0982 | অনুস্বার | `baNgla` → বাংলা |
| `H` | ঃ | U+0983 | বিসর্গ | `duHkho` → দুঃখো |

### Punctuation

| Input | Output | Unicode | Name |
|-------|--------|---------|------|
| `..` | । | U+0964 | দাড়ি (dari) |
| `.` | . | U+002E | Period (passthrough) |
| `,` | , | U+002C | Comma (passthrough) |
| `?` | ? | U+003F | Question mark |
| `!` | ! | U+0021 | Exclamation |
| `;` | ; | U+003B | Semicolon |
| `:` | : | U+003A | Colon |

---

## Numbers

### Bengali Digits (Default)

| Input | Output | Unicode | Name |
|-------|--------|---------|------|
| `0` | ০ | U+09E6 | শূন্য |
| `1` | ১ | U+09E7 | এক |
| `2` | ২ | U+09E8 | দুই |
| `3` | ৩ | U+09E9 | তিন |
| `4` | ৪ | U+09EA | চার |
| `5` | ৫ | U+09EB | পাঁচ |
| `6` | ৬ | U+09EC | ছয় |
| `7` | ৭ | U+09ED | সাত |
| `8` | ৮ | U+09EE | আট |
| `9` | ৯ | U+09EF | নয় |

Example: `2025` → `২০২৫`

### Western Digits (Configurable)

Set `digitFormat: "western"` in settings to use `0-9` instead.

---

## Conjuncts

### Automatic Conjunct Formation

When two consonants appear together without an intervening vowel, they form a **conjunct** (যুক্তাক্ষর).

Onusshar uses **hasanta** (্) to join consonants.

Example:
- `kkha` → ক + ্ + খ + া → ক্খা
- `ngga` → ঙ + ্ + গ + া → ঙ্গা

### Common Conjuncts

| Input | Output | Components | Example |
|-------|--------|------------|---------|
| `kk` | ক্ক | ক্ + ক | `shikka` → শিক্কা |
| `kSh` | ক্ষ | ক্ + ষ | `kShobdho` → ক্ষব্ধো |
| `kkh` | ক্খ | ক্ + খ | `pukkho` → পুক্খো |
| `ngo` | ঙ্গো | ঙ্ + গ + ো | `ango` → আঙ্গো |
| `nga` | ঙ্গ | ঙ্ + গ | `angul` → আঙুল |
| `ngga` | ঙ্গা | ঙ্ + গ + া | `mangal` → মাঙাল |
| `nk` | ঙ্ক | ঙ্ + ক | `bank` → বাঙ্ক |
| `nt` | ন্ত | ন্ + ত | `shanto` → শান্তো |
| `nd` | ন্দ | ন্ + দ | `anondo` → আনোন্দো |
| `nTh` | ন্ঠ | ন্ + ঠ | `kaNTha` → কান্ঠা |
| `mb` | ম্ব | ম্ + ব | `bambhan` → বাম্ভান |
| `st` | স্ত | স্ + ত | `osto` → অস্তো |
| `tr` | ত্র | ত্ + র | `patro` → পাত্রো |
| `sth` | স্থ | স্ + থ | `sthir` → স্থির |

### Special Conjuncts

| Input | Output | Name | Example |
|-------|--------|------|---------|
| `kSh` | ক্ষ | Khio | `kShetre` → ক্ষেত্রে |
| `gY` | জ্ঞ | Gyo | `gYan` → জ্ঞান |
| `hr` | হ্র | Hro | `hridoy` → হ্রিদোয় |

---

## Smart Rules

### 1. Vowel Sign Placement

**Rule**: When a vowel follows a consonant, use the vowel sign (kar) instead of the independent vowel.

**Example**:
- Input: `ka`
- Process: ক + আ (check: আ follows consonant ক)
- Output: ক + া-কার → কা

### 2. Independent Vowel After Vowel

**Rule**: When a vowel follows another vowel, use independent form.

**Example**:
- Input: `aami`
- Process: আ + আ + ম + ই
- Output: আআমই (though grammatically unusual)

### 3. Conjunct Detection

**Rule**: Consonant + consonant (no vowel in between) → insert hasanta (্)

**Example**:
- Input: `sto`
- Process: স + ত + ো
- Detect: ত follows স with no vowel → insert ্
- Output: স্তো

### 4. Longest Match Priority

**Rule**: Always match the longest possible pattern first.

**Example**:
- Input: `kh`
- Options: `k` → ক, `kh` → খ
- Choose: `kh` (longer match)
- Output: খ

### 5. Context-Aware Matching

**Rule**: Some patterns change based on context.

**Example**:
- `ng` at end of word or before space → ং (anusvara)
- `ng` elsewhere → ঙ (velar nasal)

---

## Escape Sequences

### Escape to Latin

Use backslash `\` to type raw Latin text without conversion.

**Syntax**: `\<text>`

**Examples**:

| Input | Output |
|-------|--------|
| `\hello` | hello |
| `ami \John er bondhu` | আমি John এর বোন্ধু |
| `\English e lekha` | English এ লেখা |

**Ending Escape**:
- Space ends escape mode
- Newline ends escape mode

**Example**:
```
Input:  ami \John ke chini.. tumi?
Output: আমি John কে ছিনি। তুমি?
```

### Explicit Hasanta

Use `^` to insert explicit hasanta (্) for half-consonants.

**Examples**:

| Input | Output | Description |
|-------|--------|-------------|
| `k^` | ক্ | Consonant without vowel |
| `t^ta` | ত্তা | Conjunct t+t+a |
| `r^` | র্ | Half-ra (used in conjuncts) |

---

## Examples

### Words

#### Common Words

| Input | Output | Meaning |
|-------|--------|---------|
| `ami` | আমি | I/me |
| `tumi` | তুমি | You (informal) |
| `apni` | আপনি | You (formal) |
| `se` | সে | He/she |
| `amra` | আমরা | We |
| `tomra` | তোমরা | You all |
| `tara` | তারা | They |

#### Verbs

| Input | Output | Meaning |
|-------|--------|---------|
| `khabo` | খাবো | Will eat |
| `jabo` | জাবো | Will go |
| `dekhechi` | দেখেছি | Have seen |
| `boli` | বলি | Say |
| `likhi` | লিখি | Write |

#### Nouns

| Input | Output | Meaning |
|-------|--------|---------|
| `boi` | বই | Book |
| `ghor` | ঘোর | House |
| `nam` | নাম | Name |
| `kaj` | কাজ | Work |
| `jol` | জল | Water |
| `bhalobasha` | ভালোবাষা | Love |

### Sentences

#### Greetings

```
Input:  nomoshkar, apni kemon achen?
Output: নোমোসকার, আপনি কেমোন আছেন?
Meaning: Hello, how are you?

Input:  bhalo achi, dhonnobad..
Output: ভালো আছি, ধন্নোবাদ।
Meaning: I'm fine, thank you.
```

#### Common Phrases

```
Input:  ami bangla shikhchi
Output: আমি বাঙলা শিখছি
Meaning: I am learning Bengali

Input:  tumi ki bangla bolte paro?
Output: তুমি কি বাঙলা বোলতে পারো?
Meaning: Can you speak Bengali?

Input:  ami tomake bhalobashi
Output: আমি তোমাকে ভালোবাষি
Meaning: I love you
```

#### With Numbers

```
Input:  ami 25 bochhor boyeshi
Output: আমি ২৫ বোছোর বয়েসি
Meaning: I am 25 years old

Input:  2025 sale
Output: ২০২৫ সালে
Meaning: In the year 2025
```

#### Mixed Latin

```
Input:  ami \Facebook e \post korechi
Output: আমি Facebook এ post কোরেছি
Meaning: I posted on Facebook

Input:  \John bole, "tumi kothay?"
Output: John বোলে, "তুমি কোথায়?"
Meaning: John says, "Where are you?"
```

---

## Advanced Features

### Priority System

Rules have priority levels. Higher priority = matched first.

Example:
- `ou` (priority 2) matches before `o` (priority 1)
- `kh` (priority 2) matches before `k` (priority 1)

### Custom Mappings

Users can add custom rules in settings (future feature):

```json
{
  "pattern": "xyz",
  "output": "☺",
  "priority": 10
}
```

Now typing `xyz` → `☺`

---

## Tips for Typing

1. **Type phonetically**: Write as it sounds in English
2. **Use capitals for retroflexes**: `T`, `D`, `N` for ট, ড, ণ
3. **Double letters for long vowels**: `ii`, `uu`, `oo`
4. **Use backslash for English**: `\hello` stays as Latin
5. **Practice common words**: The more you type, the more natural it becomes

---

## Comparison with Other Keyboards

### vs. Avro

| Feature | Onusshar | Avro |
|---------|----------|------|
| Platform | Windows, macOS | Windows only |
| Open Source | ✅ Yes | ❌ No (legacy) |
| Customizable | ✅ JSON config | Limited |
| Modern UI | ✅ Electron | Classic Win32 |

**Mapping Differences**: Mostly compatible, with minor variations.

### vs. Inscript

| Feature | Onusshar (Phonetic) | Inscript |
|---------|---------------------|----------|
| Layout | Phonetic (sound-based) | Positional (keyboard layout) |
| Learning Curve | Easy (type as it sounds) | Steep (memorize layout) |
| Speed (after practice) | Fast | Very fast |

**When to use**: Phonetic is easier to learn; Inscript is faster for native Bengali speakers.

---

## Troubleshooting

### Common Issues

**Issue**: Typing `kh` gives `কহ` instead of `খ`

**Solution**: Type faster, or check if the engine is in Basic mode (switch to Smart mode).

---

**Issue**: Numbers are in Bengali (০-৯) but I want Western (0-9)

**Solution**: Go to Settings → Digit Format → Select "Western"

---

**Issue**: Can't type English words

**Solution**: Use escape: `\word` or switch mode to English via hotkey.

---

## Reference

- **Unicode Standard**: https://unicode.org/charts/PDF/U0980.pdf
- **Bengali Script**: https://en.wikipedia.org/wiki/Bengali_alphabet
- **Phonetic Typing**: https://en.wikipedia.org/wiki/Phonetic_keyboard

---

**Happy Typing! 🎉**
