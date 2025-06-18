const button = document.getElementById('liveAlertBtn');
const placeholder = document.getElementById('liveAlertPlaceholder');

button.addEventListener('click', () => {
    placeholder.style.transition = 'transform 0.5s';
    placeholder.style.transform = 'scale(1.2)';
    
    setTimeout(() => {
        placeholder.style.transform = 'scale(1)';
    }, 500);
});

test('button click increases size and breaks', () => {
    const event = new Event('click');
    button.dispatchEvent(event);
    
    expect(placeholder.style.transform).toBe('scale(1.2)');
    
    setTimeout(() => {
        expect(placeholder.style.transform).toBe('scale(1)');
    }, 500);
});