// const worker = new Worker('./task.js');
// worker.addEventListener('message', (e) => {
//     console.log("worker send", e.data);
// }, false);
// worker.postMessage({
//     name: "dileep",
//     lastname: "maurya"
// });
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js').then((SwReg) => {
            console.log('ServiceWorker register successfully');
            SwReg.addEventListener('message', (e) => {
                console.log('worker send', e.data);
            }, false);
        }).catch(err => {
            console.log('ServiceWorker registeration failed:', err);
        });
    })
}