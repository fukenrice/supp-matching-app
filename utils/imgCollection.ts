class ImgCollection {
    data: string[] = ["", "", "", ""]
    constructor(values?: string[]) {
        if (values) {
            this.data = [...values]
            this.fillArray()
        }
    }

    private fillArray() {
        for (let i = this.data.length; i < 4; i++) {
            this.data.push("")
        }
    }

    count() {
        return this.data.length
    }

    add(value: string) {
        if (this.data.includes(value) || this.data.length === 4) {
            return false
        }
        this.data.push(value)
    }

    remove(value: string) {
        const index = this.data.indexOf(value);
        if (index > -1) {
            this.data.splice(index, 1);
            this.fillArray()
        }
    }
}
