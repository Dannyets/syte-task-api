export const parseIds = (ids) => {
    if(!ids){
        return;
    }

    if(Array.isArray(ids)){
        return ids;
    }

    return ids.split(',');
}
