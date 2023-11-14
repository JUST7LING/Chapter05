package user.bean;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="usertable")
public class UserDTO {
	
	@Column(name = "name", nullable = false, length = 30)
	private String name;
	
	@Id
	@Column(name = "id", length = 30)
	private String id;
	
	@Column(name = "pwd", nullable = false, length = 30)
	private String pwd;
	
	private int isUser;

	public String getName() {
		return name;
	}

	public String getId() {
		return id;
	}

	public String getPwd() {
		return pwd;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setId(String id) {
		this.id = id;
	}

	public void setPwd(String pwd) {
		this.pwd = pwd;
	}
	@Override
	public String toString() {
		return name+"\t"+id+"\t"+pwd;
	}
	
	// ************* isUser
	public void setIsUser(int isUser) {
		this.isUser = isUser;
	}
	public int getIsUser() {
		return isUser;
	}
	
}
