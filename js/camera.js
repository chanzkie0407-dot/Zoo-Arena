const Camera = {
  stream: null,

  async takePhoto(type) {
    try {
      const modal = document.getElementById('camera-modal');
      const video = document.getElementById('camera-feed');
      const canvas = document.getElementById('photo-canvas');
      
      this.stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
      video.srcObject = this.stream;
      
      modal.classList.remove('hidden');
      
      setTimeout(() => {
        const ctx = canvas.getContext('2d');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0);
        
        // Add frame
        ctx.font = 'bold 30px sans-serif';
        ctx.fillStyle = type === 'win' ? '#FFD700' : '#FF5722';
        ctx.textAlign = 'center';
        ctx.fillText(type === 'win' ? '🏆 ZOO CHAMPION! 🏆' : '😅 Try Again! 😅', canvas.width/2, 50);
        
        if (this.stream) this.stream.getTracks().forEach(t => t.stop());
        modal.classList.add('hidden');
        
        if (type === 'win') {
          alert('🎉 Great job! Photo saved!');
        } else {
          alert('😅 Animal left — don\'t worry, try again!');
        }
      }, 1500);
      
    } catch (err) {
      console.log('Camera not available — skipping photo');
      if (type === 'win') alert('🎉 Victory!');
      else alert('😅 Animal lost — try again!');
    }
  }
};
