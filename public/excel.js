let selectedFile;
// console.log(window.XLSX);
document.getElementById("input").addEventListener("change", (event) => {
    selectedFile = event.target.files[0];
});

let data = [
    {
        name: "jayanth",
        data: "scd",
        abc: "sdef",
    },
];

document.getElementById("button").addEventListener("click", () => {
    XLSX.utils.json_to_sheet(data, "out.xlsx");
    if (selectedFile) {
        let fileReader = new FileReader();
        fileReader.readAsBinaryString(selectedFile);
        fileReader.onload = (event) => {
        let data = event.target.result;
        let workbook = XLSX.read(data, {
            type: "binary",
            cellDates: true,
            cellNF: false,
            cellText: false,
            dateNF: "dd/mm/yyyy hh:mm:ss",
        });
        // console.log(workbook);

        workbook.SheetNames.forEach((sheet) => {
            let rowObject = XLSX.utils.sheet_to_json(
            workbook.Sheets[sheet]
            );
            // console.log(rowObject);
            // let object = {};
            // let suraApi = [];
            let nData = rowObject.map(function (item) {
                if (item["Cod Tipo Enseñanza"] == 310) {
                item.Nivel = "Secundaria" ;
                } else if (item["Cod Tipo Enseñanza"] == 10) {
                item.Nivel = "Preescolar" ;
                } else {
                item.Nivel = "Primaria" ;
                }
                delete item["Cod Tipo Enseñanza"];
                delete item["Fecha Incorporación Curso"]
                delete item["Código Etnia"]
                delete item["Cod Tipo Enseñanza"];
                delete item["Cod Grado"];
                delete item.RBD;
                delete item["Celular"];
                delete item["Email"];
                delete item["%Asistenca"];
                delete item["Telefono"];
                delete item["Dirección"];
                delete item["Promedio Final"];
                delete item["Año"];
                delete item["Comuna Residencia"];
                delete item["Código Comuna Residencia"];
                delete item["Fecha Retiro"];
                delete item["Codigo Etnia"];
                delete item["Cod Tipo Enseñanza"];
                delete item["Cod Tipo Enseñanza"];
                //Edit Rut
                item.RUT= item.Run + "-" + item["Dígito Ver."];
                delete item["Dígito Ver."];
                delete item.Run;
                // Desc_grado to " Grado"
                item.Grado = item["Desc Grado"] ;
                delete item["Desc Grado"];
                //Letra curso to Grupo
                item.Grupo = "Grupo " + item["Letra Curso"];
                delete item["Letra Curso"];
                //Nombres to Nombre
                item.Nombre = item.Nombres;
                delete item.Nombres;


                item.Login = " ";
                item.Password = " ";
                
                //order
                // orderData= [item.Nivel,item["Grado"], item["Grupo"],item.Nombre, item["Apellido Paterno"], item["Apellido Materno"], item["Genero"],item["Fecha Nacimiento"], item["RUT"], item["Login"], item["Password"]]
                // return item;
                
                
            });
            orderData= [nData];
            orderData.map( i => { 
                return { Nivel: i.Nivel, Grado: i["Grado"], Grupo: i["Grupo"], Nombre: i.Nombre }; 
            });
            console.log(orderData)
            
            // let orderData= nData.map(function (object) {
            //     object["Nivel"] = object["Nivel"] ;
            //     object["Grado"] = object["Desc grado"] ;
            //     object["Grupo"]= object.Grupo ;
            //     object["Nombre"]= object.Nombre ;
            //     object["Apellido Paterno"]= object["Apellido Paterno"] ;
            //     object["Apellido Materno"]= object["Apellido Materno"] ;
            //     object["Sexo"] = object["Genero"];
            //     object["Fecha de Nacimiento"]= object["Fecha de Nacimiento"];
                
            //     object["RUT"] = object["RUT"];
            //     // object["Login"] = object[9];
            //     // object["Password"] = object[10];     
            //     return object; 

            // });
            // console.log(orderData)
            // let suraApi = {};   
            // nData.map(function (object) {       
                
            //     object.Nivel= object[0];
            //     object["Desc grado"] = object[1];
            //     object.Grupo = object[2];

            //     object.Nombre = object[3];
            //     object["Apellido Paterno"] = object[4];
            //     object["Apellido Materno"] =  object[5];
            //     object["Genero"] = object[6];
            //     object["Fecha Nacimiento"] =object[7];
            //     object["RUT"] = object[8];
            //     object["Login"] = object[9];
            //     object["Password"] = object[10];      
            //     console.log(object)    
            // })
            
            // nData.map((I) => {
            //     let object = {};
                
            //     object.Nivel = I[0];
            //     object.Grado = I[1];
            //     object.Gupo = I[2];
            //     object.Nombre = I[3];
            //     object["Apellido Paterno"] = I[4];
            //     object["Apellido Paterno"] = I[5];
            //     object["Genero"] = I[6];
            //     object["Feche de Nacimiento"] = I[7];
            //     object.Login = I[8];
            //     object.Password = I[9];
            //     return object; 
                
                
            // });
            
            // let suraApi = [];
            // rowObject.map((item) => {
            //     let object = {};
            //     object.tipo_enseñanza = item[0];
            //     object.desc = item[1];
            //     object["Letra Curso"] = item[2];
            //     object["Nombres"] = item[3];
            //     object["Apellido Paterno"] = item[4];
            //     object["Apellido Materno"] = item[5];
            //     object["Genero"] = item[6];
            //     object["Fecha Nacimiento"] = item[7];
            //     object["RUT"] = item[8];
            //     object["Login"] = item[9];
            //     object["Password"] = item[10];
            //  object.push(object);
                

            //     console.log(suraApi);   
            // });
                
            
            // //     suraApi.push(object);
            // console.log(suraApi)

                
            // });
            console.log(rowObject);
            console.log(nData);

        // asd

        // asd
        document.getElementById("jsondata").innerHTML = JSON.stringify(
            rowObject,
            undefined,
            4
        );

        document.getElementById("button2").addEventListener("click", () => {
            var ws = XLSX.utils.json_to_sheet(rowObject);

            var wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "test");
            XLSX.writeFile(wb, "test" + ".xlsx");
        });
        // document.querySelector('button3').addEventListener("click", tablaDatos());
        // function tablaDatos(){
        //     const xhttp = new XMLHttpRequest();
        //     xhttp.open('GET','rowObject', true);
        //     xhttp.send();
        //     xhttp.onreadystatechange = function(){
        //         if(this.readyState == 4 && this.status == 200){

        //             let tabla = JSON.parse(this.responseText);
        //             console.log(tabla)
        //         }
        //     }
        // }
        });
    };
}});
