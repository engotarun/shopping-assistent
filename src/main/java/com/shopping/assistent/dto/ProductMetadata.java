package com.shopping.assistent.dto;

public class ProductMetadata {

	private String name;
	private String baseCategory;
	private String possibleRange;

	/**
	 * @return the name
	 */
	public String getName() {
		return name;
	}

	/**
	 * @param name
	 *            the name to set
	 */
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * @return the baseCategory
	 */
	public String getBaseCategory() {
		return baseCategory;
	}

	/**
	 * @param baseCategory
	 *            the baseCategory to set
	 */
	public void setBaseCategory(String baseCategory) {
		this.baseCategory = baseCategory;
	}

	/**
	 * @return the possibleRange
	 */
	public String getPossibleRange() {
		return possibleRange;
	}

	/**
	 * @param possibleRange
	 *            the possibleRange to set
	 */
	public void setPossibleRange(String possibleRange) {
		this.possibleRange = possibleRange;
	}

}
