"use strict";

// arrays for save to LS (optional)
const arrBoards = [
    {
        tag: "Board-1",
        id: 1,
    },
    {
        tag: "Board-2",
        id: 2,
    },
    {
        tag: "Board-3",
        id: 3,
    },
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

const boardOne = [];
const boardTwo = [];
const boardThree = [];

// global variables
const allData = JSON.parse(localStorage.getItem("data"));
const btnSearch = document.getElementById("headerBtnSearch");
const input = document.getElementById("headerInput");
const mainList = document.getElementById("mainList");
const btnBoards = document.getElementById("headerBtnBoards");
const boards = document.getElementById("headerBoards");
const overlay = document.getElementById("modalWindow");

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
boards.addEventListener("mouseover", () => boards.style.display = "block");
boards.addEventListener("mouseout", () => boards.style.display = "none");

btnBoards.addEventListener("click", () => {
    boards.innerHTML = "";

    boards.style.display == "block" ? boards.style.display = "none" : boards.style.display = "block";

    arrBoards.forEach(item => {
        boards.innerHTML += `
            <li id="headerBoard">
                <p id="headerBoardDescr">
                    ${item.tag}
                </p>
            </li>
        `;
    });
});

// src
const URL = "https://63fd39438ef914c555a6fbb7.mockapi.io/api/v1/data";

// get data from URL (promise func)
const getData = () => {
    return new Promise((resolve, reject) => {
        fetch(URL).then(response => response.ok ? resolve(response.json()) : reject(alert("404")))
    });
};

// get data from src
async function dataToStorage() {
    const getData = await fetch(URL);
    const jsonData = await getData.json();
    // to LS
    localStorage.removeItem("data");
    localStorage.setItem("data", JSON.stringify(jsonData));
};

// load content (build DOM)
function content({img, avatar, descr, name, tag, id}) {
    const mainListItem = createElemWithID("li", id);
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
    mainListItem.setAttribute("class", "mainListItem")

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

    // get pin-target
    mainListItem.addEventListener("click", (el) => {
        let idClickTarget = el.currentTarget.id;
        let idPinTarget = allData.find((elem => elem.id === idClickTarget));
        console.log(idPinTarget);

        // overlay btn action
        overlay.addEventListener("click", (btn) => {
            let idBtnTarget = btn.target.id;
            console.log(idBtnTarget);
            if (idBtnTarget == 1) {
                let dataBoardOne = JSON.parse(localStorage.getItem(boardOne));
                boardOne.push(dataBoardOne);
                localStorage.removeItem("boardOne");
                boardOne.push(idPinTarget);
                localStorage.setItem("boardOne", JSON.stringify(boardOne));
            } 
            // else if (idBtnTarget == 2) {
            //     boardTwo.push(idPinTarget);
            //     let dataBoardTwo = JSON.parse(localStorage.getItem(boardTwo));
            //     boardTwo.push(dataBoardTwo);
            //     localStorage.removeItem("boardTwo");
            //     localStorage.setItem("boardTwo", JSON.stringify(boardTwo));
            // } else if (idBtnTarget == 3) {
            //     boardThree.push(idPinTarget);
            //     let dataBoardThree = JSON.parse(localStorage.getItem(boardThree));
            //     boardThree.push(dataBoardThree);
            //     localStorage.removeItem("boardThree");
            //     localStorage.setItem("boardThree", JSON.stringify(boardThree));
            // } 
        });
    });

};
    
// load content and data (init)
getData().then(init => init.map(content));
dataToStorage();

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
            <li id="modalBoard">
                <p id="${item.id}" class="modalBoardDescr">
                    ${item.tag}
                </p>
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
                <p id="modalReportListItemDescr">
                    ${item.tag}
                </p>
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

// search
const search = () => {
    for (let i = 0; i < allData.length; i++) {
        let elem = allData[i];
        if (input.value === elem.tag) {
            mainList.innerHTML = ""
            mainList.innerHTML += `
                <li class="mainListItem" id="${elem.id}">
                    <div id="mainImgWrap">
                        <img id="mainImg" src="${elem.img}" alt="img">
                        <div id="submenu">
                            <button id="submenuBtnBoard" type="button">
                                Add to board
                            </button>
                            <button id="submenuBtnReport" type="button">
                                Report
                            </button>
                        </div>
                    </div>
                    <div id="mainInfo">
                        <p id="mainTag">#${elem.tag}</p>
                        <div id="mainUserInfo">
                            <div id="mainAvaWrap">
                                <img id="mainAva" src="${elem.avatar}" alt="ava">
                            </div>
                            <p id="mainName">${elem.name}</p>
                        </div>
                        <p id="mainDescr">${elem.descr}</p>
                    </div>
                </li>
            `;
        };
    };
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

// search run
btnSearch.addEventListener("click", () => {
    (input.value != "") ? search() : null;
    input.value = "";
    input.focus();
});




