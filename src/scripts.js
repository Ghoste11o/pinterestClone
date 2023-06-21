"use strict";

import {createElemWithID, createElemWithClass} from "./script_modules/utils.js"

import {arrBoards, arrProblems} from "./script_modules/arrays.js"

// global variables
let allData;
let filterData;

const URL = "https://63fd39438ef914c555a6fbb7.mockapi.io/api/v1/data";
const btnSearch = document.getElementById("headerBtnSearch");
const input = document.getElementById("headerInput");
const mainList = document.getElementById("mainList");
const btnBoards = document.getElementById("headerBtnBoards");
const boards = document.getElementById("headerBoards");
const overlayWindow = document.getElementById("modalWindow");

// dropdown button Boards
boards.addEventListener("mouseover", () => boards.style.display = "block");
boards.addEventListener("mouseout", () => boards.style.display = "none");

btnBoards.addEventListener("click", () => {
    boards.innerHTML = "";

    // toggle dropdown menu
    boards.style.display == "block" ? boards.style.display = "none" : boards.style.display = "block";

    // show menu
    arrBoards.map(el => {
        const headerBoard = createElemWithID("li", "headerBoard");
        const headerBoardDescr = createElemWithID("p", "headerBoardDescr");

        boards.append(headerBoard);
        headerBoard.append(headerBoardDescr);
        headerBoardDescr.append(el.tag);
    });
});

// get data from URL (source)
const getData = async() => {
    const data = await fetch(URL).then((res) => res.json());
    localStorage.setItem("data", JSON.stringify(data));
    return allData = JSON.parse(localStorage.getItem("data"));
};

// show content and data (init)
getData().then(init => init.map(content));

// load content (build DOM)
function content({img, avatar, descr, name, tag, id}) {
    const mainListItem = createElemWithClass("li", "mainListItem");
    const mainImgWrap = createElemWithClass("div", "mainImgWrap");
    const mainImg = createElemWithClass("img", "mainImg");
    const mainInfo = createElemWithID("div", "mainInfo");
    const mainUserInfo = createElemWithID("div", "mainUserInfo");
    const mainAvaWrap = createElemWithID("div", "mainAvaWrap");
    const mainAva = createElemWithID("img", "mainAva");
    const mainDescr = createElemWithID("p", "mainDescr");
    const mainName = createElemWithID("p", "mainName", name);
    const mainTag = createElemWithID("p", "mainTag");
    const submenu  = createElemWithClass("div", "submenu");

    const submenuBtnBoard = createElemWithID("button", "submenuBtnBoard", "Add to board");
    const submenuBtnReport = createElemWithID("button", "submenuBtnReport", "Report");
    
    mainImg.setAttribute("src", img);
    mainImg.setAttribute("alt", "img");
    mainImg.setAttribute("id", id);
    mainAva.setAttribute("src", avatar);
    mainAva.setAttribute("alt", "ava");
    submenuBtnBoard.setAttribute("type", "button");
    submenuBtnReport.setAttribute("type", "button");

    mainList.append(mainListItem);
    mainListItem.append(mainImgWrap, mainInfo);
    mainImgWrap.append(mainImg, submenu);
    submenu.append(submenuBtnBoard, submenuBtnReport);
    mainInfo.append(mainTag, mainUserInfo, mainDescr);
    mainTag.append("#" + tag);
    mainUserInfo.append(mainAvaWrap, mainName);
    mainDescr.append(descr);
    mainAvaWrap.append(mainAva);

    // show submenu
    mainImgWrap.addEventListener("mouseover", () => submenu.style.display = "flex");
    // hide submenu
    mainImgWrap.addEventListener("mouseout", () => submenu.style.display = "none");

    // show modal-board
    submenuBtnBoard.addEventListener("click", () => {
        toggleOverlay();
        modalBoard();
    });
    // show modal-report
    submenuBtnReport.addEventListener("click", () => {
        toggleOverlay();
        modalReport();
    });
};

// create modal-board
function modalBoard() {
    const modalBoardTitle = createElemWithID("h2", "modalBoardTitle", "Select board:");
    const modalBoardsList = createElemWithID("ul", "modalBoardsList");
    const modalBoardBtnClose = createElemWithID("button", "modalBoardBtnClose", "Close");

    modalBoardBtnClose.setAttribute("type", "button");

    overlayWindow.innerHTML = "";
    overlayWindow.append(modalBoardTitle, modalBoardsList, modalBoardBtnClose);

    arrBoards.map(el => {
        const modalBoardListItem = createElemWithID("li", "modalBoard");
        const modalBoardListItemDescr = createElemWithID("p", el.id, el.tag);

        modalBoardListItemDescr.setAttribute("class", "modalBoardDescr");

        modalBoardsList.append(modalBoardListItem);
        modalBoardListItem.append(modalBoardListItemDescr);
    });

    // close modal-boards
    modalBoardBtnClose.addEventListener("click", () => toggleOverlay());
};

// create modal-report
function modalReport() {
    const modalReportTitle = createElemWithID("h2", "modalReportTitle", "Select problem(s):");
    const modalReportList = createElemWithID("ul", "modalReportList");
    const modalReportBtnWrap = createElemWithID("div", "modalReportBtnWrap");
    const modalReportBtnClose = createElemWithID("button", "modalReportBtnClose", "Close");
    const modalReportBtnSend = createElemWithID("button", "modalReportBtnSend", "Send");

    modalReportBtnClose.setAttribute("type", "button");
    modalReportBtnSend.setAttribute("type", "button");

    overlayWindow.innerHTML = "";
    overlayWindow.append(modalReportTitle, modalReportList, modalReportBtnWrap);
    modalReportBtnWrap.append(modalReportBtnSend, modalReportBtnClose);

    arrProblems.map(el => {
        const modalReportListItem = createElemWithID("li", "modalReportListItem");
        const modalReportCheckbox = createElemWithID("input", "modalReportCheckbox");
        const modalReportListItemDescr = createElemWithID("p", "modalReportListItemDescr");

        modalReportCheckbox.setAttribute("type", "checkbox");

        modalReportList.append(modalReportListItem);
        modalReportListItem.append(modalReportCheckbox, modalReportListItemDescr);
        modalReportListItemDescr.append(el.tag);
    });

    // close modal-report
    modalReportBtnClose.addEventListener("click", () => toggleOverlay());
};

// search run
btnSearch.addEventListener("click", () => {
    if (input.value != "") {
        search();
    };

    input.value = "";
    input.focus();
});

// search
const search = () => {
    // get arr with pin-target
    let pinTarget = allData.filter(el => el.tag === input.value);
    // clear ul
    mainList.innerHTML = "";
    // show pin-target(s)
    pinTarget.map(el => content(el));
};

// toggle overlay
function toggleOverlay() {
    const overlayWrap = document.getElementById("overlay");
    overlayWrap.style.display == "flex" ? overlayWrap.style.display = "none" : overlayWrap.style.display = "flex";
};

// catch pin from data
mainList.addEventListener("mouseover", el => {
    let idTarget = el.target.id;
    let pin = allData.find(el => el.id === idTarget);

    if (pin != undefined) {
        localStorage.setItem("temp", JSON.stringify(pin));
    };
});

// collect pins to boards (local storage)
overlayWindow.addEventListener("click", el => {
    // get pin-target
    let idTarget = el.target.id;
    let pin = JSON.parse(localStorage.getItem("temp"));
    // collect to boards
    if (idTarget === "brd1") {
    localStorage.setItem("board-1", JSON.stringify([...JSON.parse(localStorage.getItem("board-1") || "[]"), pin]));
    } else if (idTarget === "brd2") {
    localStorage.setItem("board-2", JSON.stringify([...JSON.parse(localStorage.getItem("board-2") || "[]"), pin]));
    } else if (idTarget === "brd3") {
    localStorage.setItem("board-3", JSON.stringify([...JSON.parse(localStorage.getItem("board-3") || "[]"), pin]));
    };

    // hide pin
    if (idTarget === "modalReportBtnSend") {
        filterData = allData.filter(el => el.id != pin.id);
        // change data (src)
        localStorage.setItem("data", JSON.stringify(filterData));
        // new arr-data
        allData = JSON.parse(localStorage.getItem("data"));
        // clear ul
        mainList.innerHTML = "";
        // show new content
        allData.map(el => content(el));
        // close modal window
        toggleOverlay();
    };
});

// show collection of board
boards.addEventListener("click", el => {
    let brdName = el.target.innerHTML;
    let getDataBrd1 = JSON.parse(localStorage.getItem("board-1"));
    let getDataBrd2 = JSON.parse(localStorage.getItem("board-2"));
    let getDataBrd3 = JSON.parse(localStorage.getItem("board-3"));

    mainList.innerHTML = "";
    
    if (brdName === "Board-1") {
        getDataBrd1.map(el => content(el));
    } else if (brdName === "Board-2") {
        getDataBrd2.map(el => content(el));
    } else if (brdName === "Board-3") {
        getDataBrd3.map(el => content(el));
    };
});