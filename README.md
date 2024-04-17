# remark-lint-curvy-typography

[remark-lint](https://github.com/remarkjs/remark-lint) plugin to ensure that your Markdown doesn't contain typographical symbols.

## Usage

Use like any other [remark-lint](https://github.com/remarkjs/remark-lint) plugin.
Check out the [remark-lint](https://github.com/remarkjs/remark-lint) documentation for details.

## Options

- `'non-ascii'` - will detect all non-ASCII characters
- `['±', '“']` - a list of additional characters to expand the standard set of typographic characters

## Examples

When this rule is turned on, the following `valid.md` is ok:

```md
"Wow!" she exclaimed. "This is fantastic!". He said, 'I can't believe it.'

In German, the quotation marks are "different".

The event will be held from June 1 - 5.
The statement - if you ask me - is quite remarkable.
```

When this rule is turned on, the following `invalid.md` is **not** ok:

```md
“Wow!” she exclaimed. “This is fantastic!”. He said, ‘I can’t believe it.’

In German, the quotation marks are „different“.

The event will be held from June 1–5.
The statement — if you ask me — is quite remarkable.
```

```text
1:1-1:75 warning Found typographic symbols: [“ ” “ ” ‘ ’ ’] curvy-typography remark-lint

3:1-3:48 warning Found typographic symbols: [„ “]           curvy-typography remark-

5:1-6:53 warning Found typographic symbols: [– — —]         curvy-typography remark-lint

```
