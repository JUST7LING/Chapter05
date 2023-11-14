package user.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import user.bean.UserDTO;
import user.service.UserService;

@CrossOrigin
@Controller
@RequestMapping(value = "user")
public class UserController {
	@Autowired
	private UserService userService;
	// annotation으로 연결한다. 의존 관계를 맺어야 함
	
	@GetMapping(value = "isExistId")
	//@PostMapping(value="isExistId")
	@ResponseBody
	public String isExistId(@RequestParam String id) {
		//System.out.println(id);
		return userService.isExistId(id);
	}
	
	@PostMapping(value = "write")
	@ResponseBody // .jsp로 또 이동할 게 아니라면 반환형이 void더라도 붙여야 한다. 
	// 				 있던 곳으로 돌아가라는 뜻이다.
	public void write(@ModelAttribute UserDTO userDTO){
		System.out.println("usercontroller: "+userDTO.toString());
		userService.write(userDTO);
	}
	
	@GetMapping(value = "list")
	public String list(@RequestParam(required = false, defaultValue = "0") String page, Model model) {
		// 페이징 처리를 위해 페이지 값을 받아온다. 
		System.out.println("UserController String list() : pg"+page);
		model.addAttribute("page", page); 
		
		// ModelAndView 객체는 addObject를 하더라도 무조건 객체를 리턴해야 사용 가능하고,
		// Model의 경우 파라메터로 받아와서 addAttribute를 하면 리턴하지 않아도 값이 넘어간다.
	//	int totalA = userDAO.getTotalA();
		/*
		userPaging paging = new userPaging();
		paging.setCurrentPage(Integer.parseInt(pg));
		paging.setPageBlock(3);
		paging.setPageSize(5);
	//	paging.setTotalA(totalA);
		paging.makePagingHTML();
		System.out.println(paging.getPagingHTML());
		
		model.addAttribute("page",paging.getPagingHTML());
		
		*/
		 return "/user/list"; // 이게 mav.setviewname() + return mav랑 똑같다. 
	}
	
	@PostMapping(value="getUserList")
	@ResponseBody
	public Page<UserDTO> getUserList(@PageableDefault(page=0, size=3, sort="name", direction=Sort.Direction.DESC) Pageable pageable) {
		
		return userService.getUserList(pageable);
	}
	

	@PostMapping(value = "searchList")
	@ResponseBody
	public Page<UserDTO> searchList(@RequestParam String select, @RequestParam String words
						, @PageableDefault(page=0, size=3, sort="name", direction=Sort.Direction.DESC) Pageable pageable){
									// 얘네 Map으로 받아도 된다. @RequestParam Map<String, String> map
		 return userService.searchList(select, words, pageable);
	}
	
	@PutMapping(value = "update")
	public void update(@ModelAttribute UserDTO userDTO){
		System.out.println("usercontroller: "+userDTO.toString());
		userService.update(userDTO);
	}
	
	@DeleteMapping(value = "delete")
	public void delete(@RequestParam String id) {
		System.out.println(id);
		userService.delete(id);
	}
	
	
	
	
	
}
