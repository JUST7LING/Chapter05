package user.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import user.bean.UserDTO;

public interface UserService {

	public String isExistId(String id);
	public void write(UserDTO userDTO);
	public void update(UserDTO userDTO);
	public void delete(String id);
	public List<UserDTO> searchList(String select, String words);
	public Page<UserDTO> getUserList(Pageable pageable);
	public Page<UserDTO> searchList(String select, String words, Pageable pageable);
	
}
