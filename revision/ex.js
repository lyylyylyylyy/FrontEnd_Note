
function waste(str1, str2) {
    var len = str2.length;
    var result = 0;
    var str = str1;
    var position = 0;
    var i = 0;
    var count = 0;
    while (i < len) {
        while (str.indexOf(str2[i])) {
            position = str.indexOf(str2[i]);
            str = str.slice(str.indexOf(str2[i])+1);
            count++;
            i++;
        }
        result = 26-count+result;
        str = str1;
        count = 0;
        i++;
    }
    return result;
}

console.log(waste('abcdefghijklmnopqrstuvwxyz ','meituan'));