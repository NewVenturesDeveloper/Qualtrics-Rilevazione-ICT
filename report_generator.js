function saveR() {
    function datenum(v, date1904) {
        if (date1904) v += 1462;
        var epoch = Date.parse(v);
        return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000);
    }

    function sheet_from_array_of_arrays(data, opts) {
        //console.log("ciao1")
        var ws = {};
        var range = { s: { c: 10000000, r: 10000000 }, e: { c: 0, r: 0 } };
        for (var R = 0; R != data.length; ++R) {
            for (var C = 0; C != data[R].length; ++C) {
                if (range.s.r > R) range.s.r = R;
                if (range.s.c > C) range.s.c = C;
                if (range.e.r < R) range.e.r = R;
                if (range.e.c < C) range.e.c = C;
                var cell = { v: data[R][C] };
                if (cell.v == null) continue;
                var cell_ref = XLSX.utils.encode_cell({ c: C, r: R });

                if (typeof cell.v === 'number') cell.t = 'n';
                else if (typeof cell.v === 'boolean') cell.t = 'b';
                else if (cell.v instanceof Date) {
                    cell.t = 'n'; cell.z = XLSX.SSF._table[14];
                    cell.v = datenum(cell.v);
                }
                else cell.t = 's';

                let valoreRiga = 0;

                if (cell.v) {
                    let cellString = cell.v;
                    // 
                    cellString = cellString.toString();
                    //console.log( cellString)
                    // for (i = 0; i < 8; i++) {
                    //         C = C+1
                    //         console.log(C)

                    if (cellString.indexOf('TOTALE') !== -1) {
                        // console.log(cell);
                        // console.log(cellAttuale);
                        // console.log(C);
                        //valoreRiga = R;
                        cell.s = {
                            font: {
                                bold: true,
                            }
                        }
                    }
                    //     else if (C == 0) {
                    //     cell.s = {
                    //           alignment:{
                    //                 wrapText: true,
                    //         }
                    //   }
                    //  }

                    else if (cellString.indexOf('I tuoi dati') !== -1 || cellString.indexOf('A0') !== -1 || cellString.indexOf('A1') !== -1 || (cellString.indexOf('Note') !== -1 && !cellString.indexOf('Notebook') !== -1) || cellString.indexOf('B0') !== -1 || cellString.indexOf('B1') !== -1 || cellString.indexOf('D0') !== -1 || cellString.indexOf('B.S.') !== -1 || cellString.indexOf('Totale Acquisti HW') !== -1 || cellString.indexOf('Totale Acquisti servizi di sviluppo SW') !== -1 || cellString.indexOf('Totale  Acquisti Licenze') !== -1 || cellString.indexOf('Totale  Manutenzioni HW/SW e Assistenza/Presidi Applicativi') !== -1 || cellString.indexOf('Totale Acquisti altri servizi') !== -1 || cellString.indexOf('Totale spesa per canale') !== -1 || cellString.indexOf('Totale spesa CAPEX') !== -1 || cellString.indexOf('CA') !== -1 || cellString.indexOf('CB') !== -1 || cellString.indexOf('CC') !== -1 || cellString.indexOf('CD') !== -1 || cellString.indexOf('Servizi ai Cittadini') !== -1 || cellString.indexOf('Servizi a Cittadini e Imprese') !== -1 || cellString.indexOf('Servizi alle Imprese') !== -1 || cellString.indexOf('Modalità di accesso e misurazione performance') !== -1 || cellString.indexOf('Data Governance & Open Data') !== -1 || cellString.indexOf('Cloud') !== -1 || cellString.indexOf('Cybersecurity') !== -1) {
                        cell.s = {
                            font: {
                                sz: 12,
                                bold: true,
                                color: { rgb: "0059b3" },
                            },
                            alignment: {
                                wrapText: false,
                            }
                        }
                    }
                    //   else if( (cellString.indexOf(' X '))){

                    //     cell.s = {
                    //           alignment:{
                    //             horizontal: "center",
                    //     }
                    //     }
                    // }
                    else if (cellString.indexOf('Triennale') !== -1 || cellString.indexOf('A.') !== -1 || cellString.indexOf('B.') !== -1 || cellString.indexOf('C.') !== -1 || cellString.indexOf('D.') !== -1 || cellString.indexOf('I tuoi dati') !== -1) {
                        cell.s = {
                            font: {
                                sz: 15,
                                bold: true,
                                color: { rgb: "0059b3" },
                            },
                            alignment: {
                                wrapText: false,
                            }
                        }
                    }

                    // else if( (cellString)){
                    //     console.log("sono numero")
                    //     cell.s = {
                    //           alignment:{
                    //             horizontal: "center",
                    //     }
                    //     }
                    // }
                    else {
                        cell.s = {
                            alignment: {
                                wrapText: true,
                            }
                        }

                    }
                    //  cellAttuale.s = {
                    //         fill: {
                    //          fgColor: { rgb: "0059b3" }
                    //     }
                    // }

                    // else {
                    //         cell.s = {
                    //         font: {
                    //             size: 18,
                    //             name: 'Titillium Web',
                    //         }
                    //         }
                    // }   

                    //console.log(cell.s);
                }


                // if(str.indexOf(substr) > -1)
                // console.log(typeof(cell.v));

                // if (R == valoreRiga) {
                //     cell.s = {
                //         font: {
                //             size: 18,
                //             bold: true,
                //             color: { argb: 'FF0059B3' },
                //         },
                //         fill: {
                //              fgColor: { rgb: "0059b3" }
                //         }
                //     }
                // }

                ws[cell_ref] = cell;
                var wscols = [
                    { wch: 40 }, // "characters"
                    { wch: 15 },
                    { wch: 15 },
                    { wch: 15 },
                    { wch: 15 },
                    { wch: 15 },
                    { wch: 15 },
                    { wch: 15 },
                    { wch: 15 },
                    ,
                    // {hidden: true} // hide column
                ];

                for (i = 0; i !== wscols.length; ++i)
                    // console.log(wscols[i]);

                    ws['!cols'] = wscols;
            }
        }
        if (range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range);
        return ws;
    }

    function Workbook() {
        if (!(this instanceof Workbook)) return new Workbook();
        this.SheetNames = [];
        this.Sheets = {};
    }

    function s2ab(s) {
        var buf = new ArrayBuffer(s.length);
        var view = new Uint8Array(buf);
        for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
    }


    var data1 = [];
    var data2 = [];
    var data3 = [];
    var data4 = [];
    var data5 = [];


    var RowBlank = [' ']
    // SEZIONE C

    var projectElements = $(".QuestionOuter")
    Array.prototype.forEach.call(projectElements, function (el) {

        if (el.classList.contains('TE') && (el.classList.contains('QID855'))) {
            var rowN = []
            var elementoN = "I tuoi dati"
            rowN.push(elementoN)
            data4.push(rowN)
            data4.push(RowBlank)
            var collectorTd = el.getElementsByTagName("td");
            var rowName = [collectorTd[0].innerText, collectorTd[1].getElementsByTagName("input")[0].value];
            data4.push(rowName);
            var rowSurname = [collectorTd[2].innerText, collectorTd[3].getElementsByTagName("input")[0].value];
            data4.push(rowSurname);
            var rowCF = [collectorTd[4].innerText, collectorTd[5].getElementsByTagName("input")[0].value];
            data4.push(rowCF);
            data4.push(RowBlank)
            data4.push(RowBlank)
        }
        else if (el.classList.contains('DB') && !(el.classList.contains('hidden')) && (el.classList.contains('QID3'))) {
            var rowNA = []
            let stringA = el.innerText;
            var indexA = stringA.indexOf("Benvenuto");
            var substrA = stringA.substr(0, indexA);
            rowNA.push(substrA)
            data4.push(rowNA)
            data4.push(RowBlank)
        }
        else if (el.classList.contains('DB') && !(el.classList.contains('hidden')) && (el.classList.contains('QID51'))) {
            var rowNA = []
            let stringA = el.innerText;
            var indexA = stringA.indexOf("Generali");
            var substrA = stringA.substr(0, indexA + 8);
            rowNA.push(substrA)
            data4.push(rowNA)
            data4.push(RowBlank)
        }
        else if (el.classList.contains('DB') && !(el.classList.contains('hidden')) && (el.classList.contains('QID49'))) {
            var rowNA = []
            let stringA = el.innerText;
            var indexA = stringA.indexOf("acquisto");
            var substrA = stringA.substr(0, indexA + 8);
            rowNA.push(substrA)
            data4.push(rowNA)
            data4.push(RowBlank)
        }

        else if (el.classList.contains('DB') && !(el.classList.contains('hidden')) && (el.classList.contains('QID694'))) {
            var rowNA = []
            let stringA = el.innerText;
            var indexA = stringA.indexOf("Sanità");
            var substrA = stringA.substr(0, indexA + 6);
            rowNA.push(substrA)
            data4.push(rowNA)
            data4.push(RowBlank)
        }

        else if (el.classList.contains('DB') && !(el.classList.contains('hidden')) && (el.classList.contains('QID43'))) {
            var rowNA = []
            let stringA = el.innerText;
            var indexA = stringA.indexOf("spesa");
            var substrA = stringA.substr(0, indexA + 5);
            rowNA.push(substrA)
            data4.push(rowNA)
            data4.push(RowBlank)
        }

        else if (el.classList.contains('DB') && !(el.classList.contains('hidden')) && (el.classList.contains('QID44'))) {
            var rowNA = []
            let stringA = el.innerText;
            var indexA = stringA.indexOf("Progetti");
            var substrA = stringA.substr(0, indexA + 8);
            rowNA.push(substrA)
            data4.push(rowNA)
            data4.push(RowBlank)
        }

        else if (el.classList.contains('DB') && !(el.classList.contains('hidden')) && (el.classList.contains('QID859'))) {
        }
        else if (el.classList.contains('DB') && !(el.classList.contains('hidden')) && (el.classList.contains('QID861'))) {
        }

        else if (el.classList.contains('DB') && !(el.classList.contains('hidden'))) {
            var rowN = []
            var elementoN = ""
            elementoN += el.innerText
            rowN.push(elementoN)
            data4.push(rowN)
            data4.push(RowBlank)
        }
        else if (el.classList.contains('TE') && !(el.classList.contains('hidden'))) {
            var rowE = []
            var elementoE = ''
            var rowValore = []
            var valoreE = ''
            elementoE = el.innerText
            valoreE = el.getElementsByTagName("input")[0].value
            rowE.push(elementoE)
            rowValore.push(valoreE)
            data4.push(rowE)
            data4.push(rowValore)
            data4.push(RowBlank)
            data4.push(RowBlank)
        }
        else if (el.classList.contains('MC') && !(el.classList.contains('hidden'))) {
            var rowM = []
            var elementoM = ''
            var elementoF = ''
            elementoM = el.getElementsByTagName("legend")[0].innerText
            rowM.push(elementoM)
            data4.push(rowM)
            if (el.querySelector(".q-checked")) {
                elementsChecked = el.querySelectorAll(".q-checked span");
                Array.prototype.forEach.call(elementsChecked, function (el_checked) {
                    elementoF = el_checked.innerText
                    var rowF = [];
                    rowF.push(elementoF)
                    data4.push(rowF)
                })
                //elementoF= el.querySelector(".q-checked span").innerText
            }
            data4.push(RowBlank)
            data4.push(RowBlank)
        }
        else if (el.classList.contains('Matrix') && !(el.classList.contains('hidden'))) {
            var rowT = []
            var rowtd1 = []
            var elementoT = ''
            elementoT = el.getElementsByTagName("legend")[0].innerText
            rowT.push(elementoT)
            data4.push(rowT)

            var collectorRighe = el.getElementsByTagName("tr");
            Array.prototype.forEach.call(collectorRighe, function (riga) {
                var rowH1 = []
                collector = riga.querySelectorAll('td,th');
                Array.prototype.forEach.call(collector, function (elInput) {
                    if (elInput.tagName == 'TD') {
                        inputTd = elInput.getElementsByTagName("input")
                        valore = '';
                        if (inputTd[0] && inputTd[0].getAttribute("type") == 'text') {
                            if (inputTd[0].value == '') {
                                valore = 0;
                            } else if (isNaN(parseInt((inputTd[0].value).replace(/,/g, '')))) {
                                //   valore = parseInt((inputTd[0].value).replace(/,/g, ''));
                                valore = inputTd[0].value;
                            } else {
                                valore = parseInt((inputTd[0].value).replace(/,/g, ''));
                            }

                        } else if (inputTd[0] && inputTd[0].getAttribute("type") == 'checkbox') {
                            valore = ''
                            if (inputTd[0].checked == true) {
                                valore = "X"

                            }
                            else {
                                valore = " "
                            }

                        }
                        else if (inputTd[0] && inputTd[0].getAttribute("type") == 'radio') {
                            valore = ''
                            if (inputTd[0].checked == true) {
                                valore = "X"

                            }
                            else {
                                valore = " "
                            }

                        }
                        rowH1.push(valore)
                    } else {
                        valore = elInput.innerText;
                        rowH1.push(valore)
                    }
                })
                data4.push(rowH1)
            })
            data4.push(RowBlank)
            data4.push(RowBlank)
        }

    })

    // var indexToSplit = data4.indexOf(10); 
    // console.log(indexToSplit)
    // var data3 = data4.slice(0, indexToSplit); 
    // var data5 = data4.slice(indexToSplit + 1);

    // for (i=0; i<data4.length; i++){
    // // console.log(data4[i])
    // if(i == ["Note"] ){
    //     console.log(i[0])
    //     data5.push([i]);
    //     }
    // else{

    // }
    // //
    // }

    // data4.map(function(single_array){
    //     var stringheElement= ""
    //     single_array.map(function(single_element){
    //         // console.log(single_element.toString());
    //         stringheElement= single_element.toString()
    //         if(stringheElement.indexOf('Note')){return;
    //         console.log("ciao")} 
    //     })
    // //if(i==10){return;}
    //    array_part_A.push(single_element);
    // })

    //let i=0



    var blob, wb = { SheetNames: [], Sheets: {} }, ws3 = sheet_from_array_of_arrays(data4)
    wb.SheetNames.push("Sezione Riepilogo"); wb.Sheets["Sezione Riepilogo"] = ws3;

    /* add worksheet to workbook */

    var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
    saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "Rilevazione Spesa ICT Riepilogo.xlsx")

}

function read() {
    /* set up XMLHttpRequest */
    var url = "Rilevazione Spesa ICT Sezione Riepilogo.xlsx";
    var oReq = new XMLHttpRequest();
    oReq.open("GET", url, true);
    oReq.responseType = "arraybuffer";
    oReq.onload = function (e) {
        var arraybuffer = oReq.response;
        /* convert data to binary string */
        var data = new Uint8Array(arraybuffer);
        var arr = new Array();
        for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
        var bstr = arr.join("");
        /* Call XLSX */
        var workbook = XLSX.read(bstr, { type: "binary" });
        //console.log(workbook);
        /* DO SOMETHING WITH workbook HERE */
        var first_sheet_name = workbook.SheetNames[0];
        var address_of_cell = 'A1';
        /* Get worksheet */
        var worksheet = workbook.Sheets[first_sheet_name];

        /* Find desired cell */
        var desired_cell = worksheet[address_of_cell];
        /* Get the value */
        var desired_value = desired_cell.v;


        var wb = new Workbook(), ws = worksheet;

        /* add worksheet to workbook */


        wb.SheetNames.push("new");
        wb.Sheets["new"] = ws;
        var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
        saveAs(new Blob([s2ab(wbout)], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8" }), "Rilevazione Spesa ICT Riepilogo.xlsx")
    }
    oReq.send();
}


(function (view) {
    "use strict";

    view.URL = view.URL || view.webkitURL;

    if (view.Blob && view.URL) {
        try {
            new Blob;
            return;
        } catch (e) { }
    }

    // Internally we use a BlobBuilder implementation to base Blob off of
    // in order to support older browsers that only have BlobBuilder
    var BlobBuilder = view.BlobBuilder || view.WebKitBlobBuilder || view.MozBlobBuilder || (function (view) {
        var
            get_class = function (object) {
                return Object.prototype.toString.call(object).match(/^\[object\s(.*)\]$/)[1];
            }
            , FakeBlobBuilder = function BlobBuilder() {
                this.data = [];
            }
            , FakeBlob = function Blob(data, type, encoding) {
                this.data = data;
                this.size = data.length;
                this.type = type;
                this.encoding = encoding;
            }
            , FBB_proto = FakeBlobBuilder.prototype
            , FB_proto = FakeBlob.prototype
            , FileReaderSync = view.FileReaderSync
            , FileException = function (type) {
                this.code = this[this.name = type];
            }
            , file_ex_codes = (
                "NOT_FOUND_ERR SECURITY_ERR ABORT_ERR NOT_READABLE_ERR ENCODING_ERR "
                + "NO_MODIFICATION_ALLOWED_ERR INVALID_STATE_ERR SYNTAX_ERR"
            ).split(" ")
            , file_ex_code = file_ex_codes.length
            , real_URL = view.URL || view.webkitURL || view
            , real_create_object_URL = real_URL.createObjectURL
            , real_revoke_object_URL = real_URL.revokeObjectURL
            , URL = real_URL
            , btoa = view.btoa
            , atob = view.atob

            , ArrayBuffer = view.ArrayBuffer
            , Uint8Array = view.Uint8Array
            ;
        FakeBlob.fake = FB_proto.fake = true;
        while (file_ex_code--) {
            FileException.prototype[file_ex_codes[file_ex_code]] = file_ex_code + 1;
        }
        if (!real_URL.createObjectURL) {
            URL = view.URL = {};
        }
        URL.createObjectURL = function (blob) {
            var
                type = blob.type
                , data_URI_header
                ;
            if (type === null) {
                type = "application/octet-stream";
            }
            if (blob instanceof FakeBlob) {
                data_URI_header = "data:" + type;
                if (blob.encoding === "base64") {
                    return data_URI_header + ";base64," + blob.data;
                } else if (blob.encoding === "URI") {
                    return data_URI_header + "," + decodeURIComponent(blob.data);
                } if (btoa) {
                    return data_URI_header + ";base64," + btoa(blob.data);
                } else {
                    return data_URI_header + "," + encodeURIComponent(blob.data);
                }
            } else if (real_create_object_URL) {
                return real_create_object_URL.call(real_URL, blob);
            }
        };
        URL.revokeObjectURL = function (object_URL) {
            if (object_URL.substring(0, 5) !== "data:" && real_revoke_object_URL) {
                real_revoke_object_URL.call(real_URL, object_URL);
            }
        };
        FBB_proto.append = function (data/*, endings*/) {
            var bb = this.data;
            // decode data to a binary string
            if (Uint8Array && (data instanceof ArrayBuffer || data instanceof Uint8Array)) {
                var
                    str = ""
                    , buf = new Uint8Array(data)
                    , i = 0
                    , buf_len = buf.length
                    ;
                for (; i < buf_len; i++) {
                    str += String.fromCharCode(buf[i]);
                }
                bb.push(str);
            } else if (get_class(data) === "Blob" || get_class(data) === "File") {
                if (FileReaderSync) {
                    var fr = new FileReaderSync;
                    bb.push(fr.readAsBinaryString(data));
                } else {
                    // async FileReader won't work as BlobBuilder is sync
                    throw new FileException("NOT_READABLE_ERR");
                }
            } else if (data instanceof FakeBlob) {
                if (data.encoding === "base64" && atob) {
                    bb.push(atob(data.data));
                } else if (data.encoding === "URI") {
                    bb.push(decodeURIComponent(data.data));
                } else if (data.encoding === "raw") {
                    bb.push(data.data);
                }
            } else {
                if (typeof data !== "string") {
                    data += ""; // convert unsupported types to strings
                }
                // decode UTF-16 to binary string
                bb.push(unescape(encodeURIComponent(data)));
            }
        };
        FBB_proto.getBlob = function (type) {
            if (!arguments.length) {
                type = null;
            }
            return new FakeBlob(this.data.join(""), type, "raw");
        };
        FBB_proto.toString = function () {
            return "[object BlobBuilder]";
        };
        FB_proto.slice = function (start, end, type) {
            var args = arguments.length;
            if (args < 3) {
                type = null;
            }
            return new FakeBlob(
                this.data.slice(start, args > 1 ? end : this.data.length)
                , type
                , this.encoding
            );
        };
        FB_proto.toString = function () {
            return "[object Blob]";
        };
        FB_proto.close = function () {
            this.size = this.data.length = 0;
        };
        return FakeBlobBuilder;
    }(view));

    view.Blob = function Blob(blobParts, options) {
        var type = options ? (options.type || "") : "";
        var builder = new BlobBuilder();
        if (blobParts) {
            for (var i = 0, len = blobParts.length; i < len; i++) {
                builder.append(blobParts[i]);
            }
        }
        return builder.getBlob(type);
    };
}(typeof self !== "undefined" && self || typeof window !== "undefined" && window || this.content || this));
