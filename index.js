var but1 = document.getElementById('but1')
var but2 = document.getElementById('but2')
but1.addEventListener('click',() => {
    window.location.href="/static1/"
    alert('挑战到1成功')
})
but2.addEventListener('click',() => {
    self.location="/static2/"
    alert('挑战到2成功')
})