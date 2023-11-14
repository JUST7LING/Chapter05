package user.dao;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import user.bean.UserDTO;

@Repository
public interface UserDAO extends JpaRepository<UserDTO, String>{

	//List<UserDTO> findByNameContaining(String words); // 수정해야 함

	//List<UserDTO> findByIdContaining(String words);
	
	//** 주의 
	// 모두 선택 시 와일드카드(*)를 사용하지 않는다. (select * from ... ) << (X)
	// 테이블, 클래스명을 쓰지 않고 선언된 엔티티의 객체명을 쓴다. (select userDTO from UserDTO) << (O)
	// select 엔티티 객체 from 엔티티 타입
	/*
	@Query(value = "select * from usertable where name like concat ('%', ?1, '%')", nativeQuery = true)
	public List<UserDTO> getSearchName(String words); // ?1은 첫 번째 매개변수라는 뜻이다. words의 값이 들어간다.
			// 만약 searchName(String a, String b, String c)이면 ?2, ?1, ?3일 때 b, a, c 순으로 들어간다.
	@Query(value = "select * from usertable where id like concat('%', ?1, '%')", nativeQuery  = true)
	public List<UserDTO> getSearchId(String words);
	*/
	@Query("select userDTO from UserDTO userDTO where userDTO.name like concat('%', :value, '%')")
	public List<UserDTO> getSearchName(@Param("value") String words);
	
	@Query("select userDTO from UserDTO userDTO where userDTO.id like concat('%', :value, '%')")
	public List<UserDTO> getSearchId(@Param("value") String words);
	
	// 231025
	@Query("select userDTO from UserDTO userDTO where userDTO.name like concat('%', :value, '%')")
	public Page<UserDTO> getSearchName(Pageable pageable, @Param("value")String words);
	@Query("select userDTO from UserDTO userDTO where userDTO.id like concat('%', :value, '%')")
	public Page<UserDTO> getSearchId(Pageable pageable, @Param("value")String words);
	
}
