self.addEventListener('message', (e) => {
    console.log('worker received:', e.data);
    self.postMessage(e.data);
}, false);