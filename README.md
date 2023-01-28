# aqua2kamai_chusan
Generates チュウ三 batch-manual JSON files from aqua DB.

## Requirements
- NodeJS
- npm
- Aqua server

## Installation
- `git clone https://github.com/Xn2/aqua2kamai_chusan.git && cd aqua2kamai_chusan && npm i`

## Usage
- Copy your `Aqua SQLite Database file` to the root of `aqua2kamai_chusan` it should be named `db.sqlite`.
- If multiple cards are registered in your aqua instance, be sure to edit the `userID` variable in the `index.js` file accordingly.
- Use `node index.js` to export your scores. They will be saved as `SCORES.json`.

