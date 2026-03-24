# Modifications

Miscellaneous addons for the note type. **Browse** -> **Cards**. To apply a patch:

```sh
patch -p0 < modifications/kanji-database.patch
```

If multiple patches are being applied, consider adding `--fuzz=3` as an argument to `patch`. Patches can be created with:

```sh
diff -ur src/ modifications/kanji-database/ > modifications/kanji-database.patch
```

