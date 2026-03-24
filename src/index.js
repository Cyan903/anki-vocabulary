import consola from "consola";

import { readFile, writeFile } from "fs/promises";
import { XMLParser } from "fast-xml-parser";

/*
 * index.js
 *
 * Convert KANJIDIC into a smaller customized JSON format
 * for use with Anki. `pnpm run download` to fetch the assets.
 *
 * See:
 *  - https://www.edrdg.org/wiki/KANJIDIC_Project.html
 *  - http://www.edrdg.org/kanjidic/kanjidic2.xml.gz
 */

const KANJI_DB = "./assets/kanjidic2.xml";
const OUTPUT_ALL = "./output/_kdb.json";
const OUTPUT_JS = "./output/_kdb.js";
const REMOVE_EMPTY = true;

const OPTIONS = {
    ignoreAttributes: false,
    attributeNamePrefix: "@_",
};

const TAGS = {
    grade: "grade",
    freq: "frequency",
    jlpt: "JLPT",
};

const toArray = (value) => {
    if (!value) return [];
    return Array.isArray(value) ? value : [value];
};

const json = async () => {
    consola.info(`Using "${KANJI_DB}"`);
    consola.info("Processing...");

    const file = await readFile(KANJI_DB);
    const parsed = new XMLParser(OPTIONS).parse(file)?.kanjidic2;

    if (!parsed) {
        consola.fatal("Dictionary not found,", parsed);
        process.exit(1);
    }

    consola.success(`Loaded KANJIDIC2 - ${parsed.header["date_of_creation"]} (v${parsed.header["file_version"]})`);

    return parsed.character;
};

const parse = (database, item) => {
    const tags = {};

    for (const tag of Object.keys(item.misc)) {
        if (!TAGS[tag]) continue;
        tags[TAGS[tag]] = item.misc[tag];
    }

    const entry = {
        tags,

        meaning: toArray(item.reading_meaning?.rmgroup?.meaning).filter((m) => typeof m == "string"),

        reading: {
            on: toArray(item.reading_meaning?.rmgroup?.reading)
                .filter((f) => f["@_r_type"] == "ja_on")
                .map((r) => r["#text"]),

            kun: toArray(item.reading_meaning?.rmgroup?.reading)
                .filter((f) => f["@_r_type"] == "ja_kun")
                .map((r) => r["#text"]),

            nanori: toArray(item.reading_meaning?.nanori),
        },
    };

    // If there's no data, don't add it
    // prettier-ignore
    if (
        REMOVE_EMPTY && Object.keys(entry.tags).length == 0 &&

        entry.meaning.length == 0 &&
        entry.reading.on.length == 0 &&
        entry.reading.kun.length == 0 &&
        entry.reading.nanori.length == 0
    ) {
        consola.warn(`${item.literal} has no data, skipping`);
        return;
    }

    database[item.literal] = entry;
};

const format = (json) => {
    const db = {};

    consola.info("Formatting...");

    for (const item of json) {
        consola.info(`Processing -> ${item.literal}`);
        parse(db, item);
    }

    consola.success("Formatted");

    return db;
};

(async () => {
    const results = await json();
    const formatted = format(results);

    if (await consola.prompt(`Write formatted to "${OUTPUT_ALL}"`, { type: "confirm" })) {
        await writeFile(OUTPUT_ALL, JSON.stringify(formatted, null, 4));
        consola.success(`Wrote to "${OUTPUT_ALL}"`);
    }

    if (await consola.prompt(`Write JS to "${OUTPUT_JS}"`, { type: "confirm" })) {
        await writeFile(OUTPUT_JS, `if(!window._kdb)window._kdb=${JSON.stringify(formatted)};`);
        consola.success(`Wrote to "${OUTPUT_JS}"`);
    }
})();
