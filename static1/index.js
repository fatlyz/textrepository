if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('../sw.js', { scope: '/static1/' }).then(function(reg) {
      // registration worked
      console.log('Registration succeeded. Scope is ' + reg.scope);
    }).catch(function(error) {
      // registration failed
      console.log('Registration failed with ' + error);
    });
}
var but = document.getElementsByClassName('but')
var div = document.getElementById('div')
function get(){
    fetch('/test.json').then((res) => {
        return res.json();})  
    .then((data) => {
        let str = ''
        function getstr(data) {
            for (i in data){
                str = str +i+ ":" + data[i] +"</br>"
            }
            return str
        }
                
            div.innerHTML =getstr(data)
            }) 
    }
    function get1(){
        fetch('/test1.json').then((res) => {
            return res.json();})  
        .then((data) => {
            let str = ''
            function getstr(data) {
                for (i in data){
                    str = str +i+ ":" + data[i] +"</br>"
                }
                return str
            }
                    
                div.innerHTML =getstr(data)
                }) 
        }
        function get2(){
            fetch('/test2.json').then((res) => {
                return res.json();})  
            .then((data) => {
                let str = ''
                function getstr(data) {
                    for (i in data){
                        str = str +i+ ":" + data[i] +"</br>"
                    }
                    return str
                }
                        
                    div.innerHTML =getstr(data)
                    }) 
            }