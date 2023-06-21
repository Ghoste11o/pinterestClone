// new elem with ID
const createElemWithID = (tag, idDescr, descr) => {
    let elem = document.createElement(tag);
    elem.setAttribute("id", idDescr);
    (!!descr) ? elem.append(descr) : elem;
    return elem;
};

// new elem with class
const createElemWithClass = (tag, classDescr, descr) => {
    let elem = document.createElement(tag);
    elem.setAttribute("class", classDescr);
    (!!descr) ? elem.append(descr) : elem;
    return elem;
};

export {createElemWithID, createElemWithClass};