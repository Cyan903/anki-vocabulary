# Anki Vocabulary

![code-size](https://img.shields.io/github/languages/code-size/cyan903/anki-vocabulary) ![last-commit](https://img.shields.io/github/last-commit/cyan903/anki-vocabulary) ![license](https://img.shields.io/github/license/cyan903/anki-vocabulary)

My personal note type for [Anki](https://apps.ankiweb.net/). Inspired by [Crop Theft Vocab](https://github.com/Kuuuube/crop-theft). Very opinionated and made for my own use.

## Setup

| Anki Field          | Yomitan                   | Jidoujisho                                                                                         |
|---------------------|---------------------------|----------------------------------------------------------------------------------------------------|
| Word                | {expression}              | Term                                                                                               |
| Word Reading        | {reading}                 | Reading                                                                                            |
| Word Audio          | {audio}                   | Term Audio                                                                                         |
| Word Hint           | *Empty*                   | *Empty*                                                                                            |
| Definition          | {single-glossary-[dict]}  | *Not supported, see [backfill-jidoujisho-to-yomitan](presets/backfill-jidoujisho-to-yomitan.json)* |
| Definition Glossary | {glossary}                | Definition                                                                                         |
| Sentence            | {sentence}                | Sentence                                                                                           |
| Sentence Target     | {search-query}            | Cloze Inside                                                                                       |
| Sentence Audio      | *Empty*                   | Sentence Audio                                                                                     |
| Sentence Media      | *Empty*                   | Image                                                                                              |
| Pitch               | {pitch-accent-graphs-jj}  | Pitch Accent                                                                                       |
| Pitch Position      | {pitch-accent-positions}  | *Not supported, see [backfill-pitch](presets/backfill-pitch.json)*                                 |
| Pitch Categories    | {pitch-accent-categories} | *Not supported, see [backfill-pitch](presets/backfill-pitch.json)*                                 |
| Frequency           | {frequencies}             | *Not supported, see [backfill-frequencies](presets/backfill-frequencies.json)*                     |
| Frequency Sorting   | {frequency-harmonic-rank} | Frequency                                                                                          |
| Metadata            | {document-title}          | Context                                                                                            |
| Notes               | *Empty*                   | *Empty*                                                                                            |

## Preview

- [Desktop](docs/desktop.png)
- [Mobile](docs/mobile.png)
- [Card Format](docs/README.md)

## License

[MIT](MIT)

