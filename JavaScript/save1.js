	var arr = new Array();
			function addData () {
				getData();
				arr.push({
						pid:document.getElementById("pid").value,
						pdesc:document.getElementById("pdesc").value, 
						pquantity:document.getElementById("pquantity").value, 
						pdate:document.getElementById("pdate").value
				});

				localStorage.setItem("localData",JSON.stringify(arr));
				showData();
			}

			function getData()  {
				var str = localStorage.getItem("localData");
				if(str != null)	
						arr = JSON.parse(str);
			}

			function deleteData(){
				localStorage.clear();
			}

			function showData(){
				getData();

				var tbl = document.getElementById("myTable");

				var x =tbl.rows.length; 
				while (--x) {
					tbl.deleteRow(x);
				}
				for(i=0; i<arr.length;i++){
						var r = tbl.insertRow();
				var cell1= r.insertCell();
				var cell2= r.insertCell();
				var cell3= r.insertCell();
				var cell4= r.insertCell();

				cell1.innerHTML = arr[i].pid;
				cell2.innerHTML = arr[i].pdesc;
				cell3.innerHTML = arr[i].pquantity;
				cell4.innerHTML = arr[i].pdate;
				}
			}