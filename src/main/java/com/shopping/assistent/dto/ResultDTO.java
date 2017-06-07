package com.shopping.assistent.dto;

import java.util.List;

public class ResultDTO {

	private Integer userId;
	private List<ProductDTO> suggestedProducts;

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
	 * @return the suggestedProducts
	 */
	public List<ProductDTO> getSuggestedProducts() {
		return suggestedProducts;
	}

	/**
	 * @param suggestedProducts
	 *            the suggestedProducts to set
	 */
	public void setSuggestedProducts(List<ProductDTO> suggestedProducts) {
		this.suggestedProducts = suggestedProducts;
	}

}
