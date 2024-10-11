export default class Pager{
    constructor(url, limit, resultCount, onPageChange){
        this.url = url;
        this.currentPage = 1;
        this.limit = limit;
        this.maxPage = Math.ceil(resultCount / this.limit);

        const pagerHtml = document.querySelector('.pager');
        this.btnPrevious = pagerHtml.querySelector('.btn-previous');
        this.btnNext = pagerHtml.querySelector('.btn-next');
        this.btnFirstPage = pagerHtml.querySelector('.btn-first-page');
        this.btnLastPage = pagerHtml.querySelector('.btn-last-page');
        this.btnPagings = pagerHtml.querySelectorAll('.btn-paging');

        this.updateBtns();

        this.btnPrevious.onclick = () => {
            if(this.currentPage > 1){
                this.currentPage--;
                const offset = this.getOffset(this.currentPage);
                onPageChange(this.getUrl(offset));
                this.updateBtns();
            }
        }

        this.btnNext.onclick = () => {
            if(this.currentPage < this.maxPage){
                this.currentPage++;
                const offset = this.getOffset(this.currentPage);
                onPageChange(this.getUrl(offset));
                this.updateBtns();
            }

            if(this.currentPage === this.maxPage){
               this.btnNext.setAttribute('disable', true);  
            }
        }

        this.btnFirstPage.onclick = () => {
            if(this.currentPage > 1){
                this.currentPage = 1;
                onPageChange(this.url);
                this.updateBtns();
            }
        }

        this.btnLastPage.onclick = () => {
            if(this.currentPage < this.maxPage){
                this.currentPage = this.maxPage;
                const offset = this.getOffset(this.maxPage);
                onPageChange(this.getUrl(offset));
                this.updateBtns();
            }
        }

        this.btnPagings.forEach((btn, i) => {
            btn.onclick = () => {
                const page = parseInt(btn.getAttribute('data-page'));
                this.currentPage = page;
                const offset = this.getOffset(page);
                onPageChange(this.getUrl(offset));
                this.updateBtns();
            }
        });
    }

    updatePagingBtns(){
        if(this.currentPage > 4){
            this.btnPagings.forEach((btn, i) => {
                const page = (i - 3) + this.currentPage;
                btn.textContent = page;
                btn.setAttribute('data-page', page); 
            });
        }
        else{
            this.btnPagings.forEach((btn, i) => {
                btn.textContent = i + 1;
                btn.setAttribute('data-page', i + 1); 
            });
        }

        this.btnPagings.forEach(btn => {
            const page = parseInt(btn.getAttribute('data-page'));
            
            btn.removeAttribute('disabled');

            if(page === this.currentPage || page > this.maxPage){
                btn.setAttribute('disabled', true);
            }
        });
    }

    updateOtherBtn(){
        if(this.currentPage > 1){
            this.btnPrevious.removeAttribute('disabled');
            this.btnFirstPage.removeAttribute('disabled');
        }
        else{
            this.btnPrevious.setAttribute('disabled', true);
            this.btnFirstPage.setAttribute('disabled', true);
        }

        if(this.currentPage === this.maxPage){
            this.btnNext.setAttribute('disabled', true);
            this.btnLastPage.setAttribute('disabled', true);
       }
        else{
            this.btnNext.removeAttribute('disabled');
            this.btnLastPage.removeAttribute('disabled'); 
        }
    }

    updateBtns(){
        this.updatePagingBtns();
        this.updateOtherBtn();
    }

    getOffset(page = 1){
        return (page - 1) * this.limit;
    }

    getUrl(offset){
        return this.url + `?offset=${offset}&limit=${this.limit}`;
    }
}