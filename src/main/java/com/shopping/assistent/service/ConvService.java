package com.shopping.assistent.service;

import com.shopping.assistent.dto.ConvReqDTO;
import com.shopping.assistent.dto.ConvRespDTO;

public interface ConvService {

	ConvRespDTO replyToTheConversation(ConvReqDTO reqDTO);

}
