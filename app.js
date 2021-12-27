const express = require("express");
const { json } = require("express/lib/response");
const app = express();
const fs = require("fs");
const e = require("express");
var rawdata = fs.readFileSync("bible.json");
var jsonfile = JSON.parse(rawdata);
var newtab = [
    { turkname: "Başlanğıç", name: "Genesis" },
    { turkname: "Çıkış", name: "Exodus" },
    { turkname: "Levioğulları", name: "Leviticus" },
    { turkname: "Sayılar", name: "Numbers" },
    { turkname: "Kanunun Tekrarı", name: "Deuteronomy" },
    { turkname: "Yeşu", name: "Joshua" },
    { turkname: "Hakimler", name: "Judges" },
    { turkname: "Rut", name: "Ruth" },
    { turkname: "1. Samuel", name: "1 Samuel" },
    { turkname: "2. Samuel", name: "2 Samuel" },
    { turkname: "1. Krallar", name: "1 Kings" },
    { turkname: "2. Krallar", name: "2 Kings" },
    { turkname: "1. Tarihler", name: "1 Chronicles" },
    { turkname: "2. Tarihler", name: "2 Chronicles" },
    { turkname: "Ezra", name: "Ezra" },
    { turkname: "Nehemya", name: "Nehemiah" },
    { turkname: "Ester", name: "Esther" },
    { turkname: "Eyüp", name: "Job" },
    { turkname: "Zebur", name: "Psalms" },
    { turkname: "Süleyman'ın Özdeyişleri", name: "Proverbs" },
    { turkname: "Vaiz", name: "Ecclesiastes" },
    { turkname: "Ezgiler Ezgisi", name: "Song of Songs" },
    { turkname: "Yeşaya", name: "Isaiah" },
    { turkname: "Yeremya", name: "Jeremiah" },
    { turkname: "Ağıtlar", name: "Lamentations" },
    { turkname: "Hezekiel", name: "Ezekiel" },
    { turkname: "Daniel", name: "Daniel" },
    { turkname: "Hoşea", name: "Hosea" },
    { turkname: "Yoel", name: "Joel" },
    { turkname: "Amos", name: "Amos" },
    { turkname: "Obadya", name: "Obadiah" },
    { turkname: "Yunus", name: "Jonah" },
    { turkname: "Mika", name: "Micah" },
    { turkname: "Nahum", name: "Nahum" },
    { turkname: "Habakkuk", name: "Habakkuk" },
    { turkname: "Tsefanya", name: "Zephaniah" },
    { turkname: "Haggay", name: "Haggai" },
    { turkname: "Zekeriya", name: "Zechariah" },
    { turkname: "Malaki", name: "Malachi" },
    { turkname: "Matta", name: "Matthew" },
    { turkname: "Markos", name: "Mark" },
    { turkname: "Luka", name: "Luke" },
    { turkname: "Yuhanna", name: "John" },
    { turkname: "Elçilerin İşleri", name: "Acts" },
    { turkname: "Romalılar", name: "Romans" },
    { turkname: "1. Korintoslular", name: "1 Corinthians" },
    { turkname: "2. Korintoslular", name: "2 Corinthians" },
    { turkname: "Galatyalılar", name: "Galatians" },
    { turkname: "Efesoslular", name: "Ephesians" },
    { turkname: "Filipililer", name: "Philippians" },
    { turkname: "Koloseliler", name: "Colossians" },
    { turkname: "1. Selanikliler", name: "1 Thessalonians" },
    { turkname: "2. Selanikliler", name: "2 Thessalonians" },
    { turkname: "1. Timoteos", name: "1 Timothy" },
    { turkname: "2. Timoteos", name: "2 Timothy" },
    { turkname: "Titus", name: "Titus" },
    { turkname: "Filimon", name: "Philemon" },
    { turkname: "İbraniler", name: "Hebrews" },
    { turkname: "Yakup", name: "James" },
    { turkname: "1. Petrus", name: "1 Peter" },
    { turkname: "2. Petrus", name: "2 Peter" },
    { turkname: "1. Yuhanna", name: "1 John" },
    { turkname: "2. Yuhanna", name: "2 John" },
    { turkname: "3. Yuhanna", name: "3 John" },
    { turkname: "Yahuda", name: "Jude" },
    { turkname: "Vahiy", name: "Revelation" },
];
app.set("view engine", "ejs")
app.use("/css", express.static("./public"));

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/book/:id", (req, res) => {
    var book = req.params.id;
    newtab.forEach(element => {
        if (element.turkname == book) book = element.name;
    });
    var size = 0;
    jsonfile.books.forEach(element => {
        if (element.name == book)
            size = element.chapters.length

    })
    res.render("page", { x: size });
});

app.get("/book/:id/chapter/:num", (req, res) => {
    var book = req.params.id;
    newtab.forEach(element => {
        if (element.turkname == book) book = element.name;
    });
    console.log(book);
    var stri = "";
    jsonfile.books.forEach(element => {
        if (book == element.name) {
            element.chapters.forEach(elemen => {
                if (elemen.chapter == req.params.num) {
                    elemen.verses.forEach(elem => {
                        stri += `${elem.verse}.${elem.text}`;
                    });
                }
            });
        }
    });
    res.render("index", { bible: stri })
});

app.listen(3000);