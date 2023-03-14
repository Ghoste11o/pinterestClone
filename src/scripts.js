"use strict";

// arrays for save to LS (optional)
const arrMain = [];

const arrBoards = [
    "Board-1",
    "Board-2",
    "Board-3",
];

const arrProblems = [
    {
        tag: "Problem-1",
        check: false,
    },
    {
        tag: "Problem-2",
        check: false,
    },
    {
        tag: "Problem-3",
        check: false,
    },
    {
        tag: "Problem-4",
        check: false,
    },
    {
        tag: "Problem-5",
        check: false,
    },
];

// new elem with ID
const createElemWithID = (tag, idDescr, descr) => {
    let elem = document.createElement(tag);
    elem.setAttribute("id", idDescr);
    (!!descr) ? elem.append(descr) : elem;
    return elem;
};

// new input with ID and Type
const createInputIdType = (idDescr, inputType) => {
    let elem = document.createElement("input");
    elem.setAttribute("id", idDescr);
    elem.setAttribute("type", inputType);
    return elem;
};

// dropdown button Boards
const btnBoards = document.getElementById("headerBtnBoards");
const boards = document.getElementById("headerBoards");

btnBoards.addEventListener("click", () => {
    boards.innerHTML = "";

    boards.style.display == "block" ? boards.style.display = "none" : boards.style.display = "block";

    arrBoards.forEach((item) => {
        boards.innerHTML += `
            <li id="headerBoard">
                <a id="headerBoardLink" href="">
                    ${item}
                </a>
            </li>
        `;
    });
});

// create board
function createBoard() {
    const main = document.getElementById("main");
    const mainBoard = createElemWithID("ul", "mainBoard");

    main.innerHTML = "";
    main.append(mainBoard);
};

// src
const URL = "https://63fd39438ef914c555a6fbb7.mockapi.io/api/v1/images";

// load content (promise func)
const loadContent = () => {
    return new Promise((resolve, reject) => {
        fetch(URL)
        .then((response) => (response.ok) ? resolve(response.json()) : reject(alert('critical error')))
    });
};

// load content (build DOM)
function content({img, avatar, descr, name, tag}) {
    const mainList = document.getElementById("mainList");
    const mainListItem = createElemWithID("li", "mainListItem");
    const mainImgWrap = createElemWithID("div", "mainImgWrap");
    const mainImg = createElemWithID("img", "mainImg");
    const mainInfo = createElemWithID("div", "mainInfo");
    const mainUserInfo = createElemWithID("div", "mainUserInfo");
    const mainAvaWrap = createElemWithID("div", "mainAvaWrap");
    const mainAva = createElemWithID("img", "mainAva");
    const mainDescr = createElemWithID("p", "mainDescr");
    const mainName = createElemWithID("p", "mainName", name);
    const mainTag = createElemWithID("p", "mainTag");
    const submenu  = createElemWithID("div", "submenu");
    const submenuBtnBoard = createElemWithID("button", "submenuBtnBoard", "Add to board");
    const submenuBtnReport = createElemWithID("button", "submenuBtnReport", "Report");

    mainImg.setAttribute("src", img);
    mainImg.setAttribute("alt", "img");
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

// load content (init)
loadContent().then(init => {
    init.map(content);
    arrMain.push(init);
});

// create modal-board
function modalBoard() {
    const modal = document.getElementById("modalWindow");
    const modalBoardTitle = createElemWithID("h2", "modalBoardTitle", "Select board:");
    const modalBoardsList = createElemWithID("ul", "modalBoardsList");
    const modalBoardBtnClose = createElemWithID("button", "modalBoardBtnClose", "Close");

    modalBoardBtnClose.setAttribute("type", "button");

    modal.innerHTML = "";
    modal.append(modalBoardTitle, modalBoardsList, modalBoardBtnClose);

    arrBoards.forEach(item => {
        modalBoardsList.innerHTML += `
            <li id="modalBoardsListItem">
                ${item}
            </li>
        `;
    });

    // close modal-boards
    modalBoardBtnClose.addEventListener("click", () => toggleOverlay());
};

// create modal-report
function modalReport() {
    const modal = document.getElementById("modalWindow");
    const modalReportTitle = createElemWithID("h2", "modalReportTitle", "Select problem(s):");
    const modalReportList = createElemWithID("ul", "modalReportList");
    const modalReportBtnWrap = createElemWithID("div", "modalReportBtnWrap");
    const modalReportBtnClose = createElemWithID("button", "modalReportBtnClose", "Close");
    const modalReportBtnSend = createElemWithID("button", "modalReportBtnSend", "Send");

    modalReportBtnClose.setAttribute("type", "button");
    modalReportBtnSend.setAttribute("type", "submit");

    modal.innerHTML = "";
    modal.append(modalReportTitle, modalReportList, modalReportBtnWrap);
    modalReportBtnWrap.append(modalReportBtnSend, modalReportBtnClose);

    arrProblems.forEach((item) => {
        modalReportList.innerHTML += `
            <li id="modalReportListItem">
                <input id="modalReportCheckbox" type="checkbox"/> 
                ${item.tag}
            </li>
        `;
    });

    // close modal-report
    modalReportBtnClose.addEventListener("click", () => toggleOverlay());
};

// toggle overlay
function toggleOverlay() {
    const overlay = document.getElementById("overlay");
    overlay.style.display == "flex" ? overlay.style.display = "none" : overlay.style.display = "flex";
};

