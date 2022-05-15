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
            let rowObject = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
            //Limpiando datos
            let nData = rowObject.map(function (item) {
            if (item["Cod Tipo Enseñanza"] == 310) {
                item.Nivel = "Secundaria";
            } else if (item["Cod Tipo Enseñanza"] == 10) {
                item.Nivel = "Preescolar";
            } else {
                item.Nivel = "Primaria";
            }
            delete item["Cod Tipo Enseñanza"];
            delete item["Fecha Incorporación Curso"];
            delete item["Código Etnia"];
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
            item.RUT = item.Run + "-" + item["Dígito Ver."];
            delete item["Dígito Ver."];
            delete item.Run;
            // Desc_grado to " Grado"
            item.Grado = item["Desc Grado"];
            delete item["Desc Grado"];
            //Letra curso to Grupo
            item.Grupo = "Grupo " + item["Letra Curso"];
            delete item["Letra Curso"];
            //Nombres to Nombre
            item.Nombre = item.Nombres;
            delete item.Nombres;
            item.Login = " ";
            item.Password = " ";
            return item;

        });
        
        
        //Ordenando Datos
        let orderData = [];
        nData.forEach((item) => {
            
            object = {};
            object.Nivel = item.Nivel;
            object.Grado = item.Grado;
            object.Grupo = item.Grupo;
            object.Nombre = item.Nombre;
            object["Apellido Paterno"]= item["Apellido Paterno"];
            object["Apellido Materno"]= item["Apellido Materno"];
            object.Genero= item.Genero;
            object["Fecha de Nacimiento"]= item["Fecha Nacimiento"];
            object.Login= item.Login;
            object.Password= item.Password;
        
            orderData.push(object);
        });
        console.log(orderData)
        console.log(nData);

        document.getElementById("button2").addEventListener("click", () => {
            var ws = XLSX.utils.json_to_sheet(orderData);

            var wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "test");
            XLSX.writeFile(wb, "test" + ".xlsx");
        });

        document.getElementById("button").addEventListener("click", traerDatos);
        function traerDatos() {
            let res = document.querySelector("#res");
          // res.innerHTML = ''; //ciclo for
            for (let item of orderData) {
            res.innerHTML += `<tr>
                        <td>${item.Nivel}</td>
                        <td>${item.Grado}</td>
                        <td>${item.Grupo}</td>
                        <td>${item.Nombre}</td>
                        <td>${item["Apellido Paterno"]}</td>
                        <td>${item["Apellido Materno"]}</td>
                        <td>${item.Genero}</td>
                        <td>${item["Fecha de Nacimiento"]}</td>
                        <td>${item.Login}</td>
                        <td>${item.Password}</td>
                    <tr>`;
            }
        }
    });};}
});
