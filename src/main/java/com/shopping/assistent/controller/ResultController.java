package com.shopping.assistent.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.shopping.assistent.dto.ResultDTO;
import com.shopping.assistent.service.ResultService;

@RestController
@RequestMapping("/v1")
public class ResultController {

	@Autowired
	private ResultService resultService;

	@RequestMapping(value = "/result/{userId}", method = RequestMethod.GET)
	public ResponseEntity<ResultDTO> getResultToTheConversation(@PathVariable("userId") int userId) {
		ResultDTO result = resultService.fetchResult(userId);
		return new ResponseEntity<ResultDTO>(result, HttpStatus.OK);

	}

}
