package com.verizon.uotm.model;

import java.util.List;

public class DataTableModel<T> {

	private String sEcho = null;
	private List<T> aaData = null;
	
	public String getsEcho() {
		return sEcho;
	}
	public void setsEcho(String sEcho) {
		this.sEcho = sEcho;
	}
	
	public List<T> getAaData() {
		return aaData;
	}
	public void setAaData(List<T> aaData) {
		this.aaData = aaData;
	}
	
	
}
