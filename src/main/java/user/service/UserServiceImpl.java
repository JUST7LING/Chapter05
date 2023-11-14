package user.service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import user.bean.UserDTO;
import user.dao.UserDAO;

@Service
public class UserServiceImpl implements UserService {
	@Autowired // autowired?
	private UserDAO userDAO;
	
	@Override
	public String isExistId(String id) {
		Optional<UserDTO> userDTO = userDAO.findById(id);
		
		if(userDTO.isPresent()) // 값이 없으면 false
			return "exist";
		else
			return "non_exist";
	}

	@Override
	public void write(UserDTO userDTO) {
		userDAO.save(userDTO);
		// 똑같은 id가 없으면 insert를 수행하고, 있으면 update를 수행하게 됨
	}
	
	@Override
	public Page<UserDTO> getUserList(Pageable pageable) {
		Page<UserDTO> list = userDAO.findAll(pageable);
		System.out.println(list);
		return list;
	}

	@Override
	public List<UserDTO> searchList(String select, String words) {
		List<UserDTO> list;
		
		/* 쿼리 메서드로 처리한 문장
		if(select.equals("name")) {
		//	select * from usertable where name like "%자%";
		// select * from useertable where name like concat('%', value, '%');
			list = userDAO.findByNameContaining(words);
			return list;
			
		}else if(select.equals("id")) {
			list = userDAO.findByIdContaining(words);
			return list;
		}else {
			System.out.println("Search Error. entered value is "+select);
			return null;
		} */
		
		// @Query 어노테이션을 활용하기
		if(select.equals("name")) {
			list = userDAO.getSearchName(words);
			System.out.println("requested name search! inserted name : "+words);
			System.out.println("result is : "+list);
			return list; // ** 쿼리 메서드가 아닌 일반 메서드를 사용한다. 
			
		}else if(select.equals("id")) {
			list = userDAO.getSearchId(words);
			System.out.println("requested id search! inserted id : "+words);
			System.out.println("result is : "+list);
			return list;
			
		}else {
			System.out.println("Search Error. entered value is "+select);
			return null;
		}
		
	}
	@Override // SEARCH HERE
	public Page<UserDTO> searchList(String select, String words, Pageable pageable) {
		Page<UserDTO> list ;
		
		if(select.equals("name")) {
			list = userDAO.getSearchName(pageable, words);

			System.out.println("requested name search! inserted name : "+words);
			System.out.println("result is : "+list);
			return list; // ** 쿼리 메서드가 아닌 일반 메서드를 사용한다. 
			
			
		}else if(select.equals("id")) {
			list = userDAO.getSearchId(pageable, words);

			System.out.println("requested id search! inserted id : "+words);
			System.out.println("result is : "+list);
			return list;
			
		}else {
			System.out.println("Search Error. entered value is "+select);
			return null;
		}
	}


	@Override
	public void update(UserDTO userDTO) {
		write(userDTO);
	}
	
	@Override
	public void delete(String id) {
		userDAO.deleteById(id);
	}

	
	
	
	
}
