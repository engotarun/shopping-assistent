package com.shopping.assistent.dto;

import java.util.List;

public class ConvReqDTO {

	private Integer userId;
	private List<ConversationDTO> prevConvList;
	private ConversationDTO currentConv;

	/**
	 * @return the userId
	 */
	public Integer getUserId() {
		return userId;
	}

	/**
	 * @param userId
	 *            the userId to set
	 */
	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	/**
	 * @return the prevConvList
	 */
	public List<ConversationDTO> getPrevConvList() {
		return prevConvList;
	}

	/**
	 * @param prevConvList
	 *            the prevConvList to set
	 */
	public void setPrevConvList(List<ConversationDTO> prevConvList) {
		this.prevConvList = prevConvList;
	}

	/**
	 * @return the currentConv
	 */
	public ConversationDTO getCurrentConv() {
		return currentConv;
	}

	/**
	 * @param currentConv
	 *            the currentConv to set
	 */
	public void setCurrentConv(ConversationDTO currentConv) {
		this.currentConv = currentConv;
	}

}
