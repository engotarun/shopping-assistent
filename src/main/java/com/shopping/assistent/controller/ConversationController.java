package com.shopping.assistent.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.shopping.assistent.dto.ConvReqDTO;
import com.shopping.assistent.dto.ConvRespDTO;
import com.shopping.assistent.service.ConvService;

@RestController
@RequestMapping("/v1")
public class ConversationController {
	
	@Autowired
	private ConvService convService;
	
	@RequestMapping(value = "/reply", method = RequestMethod.POST)
	public ResponseEntity<ConvRespDTO> replyToTheConversation(@RequestBody ConvReqDTO reqDTO){		
		ConvRespDTO respDTO = convService.replyToTheConversation(reqDTO);		
		return new ResponseEntity<ConvRespDTO>(respDTO,HttpStatus.OK);
		
	}

}
