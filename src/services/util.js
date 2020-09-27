const getUUID = preStr => {
	let dt = new Date().getTime();
    let uuid = 'xxx-4x-yxx'.replace(/[xy]/g, function(c) {
        let r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c==='x' ? r :((r&0x3)|(0x8))).toString(16);
    });
    return preStr+ uuid;
}

const getExpDate = (expiresIn) => {
    return new Date(new Date().getTime() + expiresIn * 1000);
}

const __setUpdate = (key, val) => {
    let data = localStorage.getItem(key);
    if (data) {
        data =  JSON.parse(data);
    } else {
        data = []
    }
    data.push(val);
    localStorage.setItem(key, JSON.stringify(data));
    return data;
}

const getCreatedAt = () => new Date().getTime();

const returnData = (status, data, errMsg = false) => {
    const ret = {
        status : status,
        data : data,
        errMsg : errMsg
    }
    return ret;
}

const getDataByFieldName = (fieldName, fieldValue, data) => {
    return data.filter(item => item[fieldName] === fieldValue);
}

export {
    getUUID,
    getExpDate,
    getCreatedAt,
    returnData,
    getDataByFieldName,
    __setUpdate
}