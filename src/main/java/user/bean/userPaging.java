package user.bean;

public class userPaging {
	private int currentPage;//현재 페이지
	private int pageBlock; //[이전][1][2][다음] .. 
	
	public int getCurrentPage() {
		return currentPage;
	}

	public void setCurrentPage(int currentPage) {
		this.currentPage = currentPage;
	}

	public int getPageBlock() {
		return pageBlock;
	}

	public void setPageBlock(int pageBlock) {
		this.pageBlock = pageBlock;
	}

	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	public int getTotalA() {
		return totalA;
	}

	public void setTotalA(int totalA) {
		this.totalA = totalA;
	}

	public StringBuffer getPagingHTML() {
		return pagingHTML;
	}

	public void setPagingHTML(StringBuffer pagingHTML) {
		this.pagingHTML = pagingHTML;
	}

	private int pageSize; // 1페이지에 할당되는 컨텐츠 숫자
	private int totalA; //총 글 수
	private StringBuffer pagingHTML;
	//		StringBuilder로 써도 상관 없다.
	// String은 수정이 안 됨
	
	public void makePagingHTML() {
		
		// 페이지의 형태 (1 ~ 8페이지)
		// 현재 페이지: 1이면
		//      1 2 3 다음>
		// 현재 페이지: 5이면
		// <이전 4 5 6 다음>
		// 현재 페이지: 7이면
		// <이전 7 8
		
		pagingHTML = new StringBuffer();

		int totalP = (totalA+(pageSize-1))/pageSize; // 총 페이지 수
		int startPage = (currentPage-1)/pageBlock*pageBlock+1;
		int endPage = startPage + pageBlock - 1;
		
		if(endPage > totalP) endPage = totalP;
		
		// paging size만큼 추가해야 한다. 첫 페이지 안에는 '이전' 버튼이 없어야 한다.
		if(currentPage >pageBlock) pagingHTML.append("<span id= 'paging' onclick= 'boardPaging("+(startPage-1)+")'>&lt;이전</span>");
		
		for(int i=startPage; i<=endPage; i++) {
			if(i==currentPage) {
				pagingHTML.append("<span id= 'currentPaging' onclick='boardPaging("+i+")'>"+i+"</span>");
			}else {
				pagingHTML.append("<span id= 'paging' onclick = 'boardPaging("+i+")'>"+i+"</span>");
			}
		}//for
		
		if(endPage<totalP) {
			pagingHTML.append("<span id = 'paging' onclick= 'boardPaging("+(endPage+1)+")'>다음&gt;</span>");
		}
		
	}// makePagingHTML
}
