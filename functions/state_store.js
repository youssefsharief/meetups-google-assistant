module.exports = {
    saveApp(item){
        this.app=item
        this.hasScreen = this.app.hasSurfaceCapability(this.app.SurfaceCapabilities.SCREEN_OUTPUT)
        this.hasAudio = this.hasScreen = this.app.hasSurfaceCapability(this.app.SurfaceCapabilities.AUDIO_OUTPUT)
    },
    saveRequestSource(item) {
        this.requestSource = item
    },
    saveResponse(item) {
        this.response = item
    }
}