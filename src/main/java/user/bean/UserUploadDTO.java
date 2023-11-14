package user.bean;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="userimage")
@Getter
@Setter
//@Data
public class UserUploadDTO {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "seq")
	private int seq;
	@Column(name = "imageName", length = 50)
	private String imageName;
	@Column(name = "imageContent", length = 4000)
	private String imageContent;
	@Column(name = "imageFileName", length = 100) // nullable = false
	private String imageFileName;
	@Column(name = "imageOriginalName", length = 100) // nullable = false
	private String imageOriginalName;
	
	@Override
	public String toString() {
		return seq+" "+imageName+" "+imageContent+" "+imageFileName+" "+imageOriginalName;
	}
	
}
