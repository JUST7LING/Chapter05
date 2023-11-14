package user.controller;

import java.io.File;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import jakarta.servlet.http.HttpSession;
import user.bean.UserUploadDTO;
import user.service.NCPObjectStorageService;
import user.service.ObjectStorageService;
import user.service.UserUploadService;

import java.net.URLEncoder;

@CrossOrigin
@RestController
@RequestMapping(value="user")
public class UserUploadController {
	
	@Autowired
	private UserUploadService userUploadService;
	
	@Autowired
	private NCPObjectStorageService ncpService;
	
	private String bucketName = "bitcamp-edu-bucket-107";
	
	@PostMapping(value="upload", produces = "application/json;charset=UTF-8")
	public void upload(@RequestPart UserUploadDTO userUploadDTO, 
			@RequestPart("img") List<MultipartFile> list, // "img"로 바꿀 것 (안 되면)
			HttpSession session ) {
		
		String filePath = session.getServletContext().getRealPath("/public/storage");
		System.out.println("실제 폴더: " + filePath);
		
		File file;
		String originalFileName, fileName;
		
		List<UserUploadDTO> userImageList = new ArrayList<>();
		
		for(MultipartFile img : list) {
			originalFileName = img.getOriginalFilename();
			System.out.println(originalFileName);
		
			// 주석풀기 
			fileName = ncpService.uploadFile(bucketName, "storage/", img);
		//	fileName = "noname";
			
			file = new File(filePath, originalFileName);
			try {
				img.transferTo(file);
			}catch(IOException e) {
				e.printStackTrace();
			}
			
			UserUploadDTO dto = new UserUploadDTO();
			dto.setImageName(userUploadDTO.getImageName());
			dto.setImageContent(userUploadDTO.getImageContent());
			
			/*
			try {
				String encodeImage = URLEncoder.encode(userUploadDTO.getImageFileName(), "euc-kr");
				dto.setImageFileName(encodeImage);
			} catch (UnsupportedEncodingException e) {
				dto.setImageFileName(userUploadDTO.getImageFileName());
				e.printStackTrace();
			}
			*/
			
			//dto.setImageOriginalName(userUploadDTO.getImageOriginalName());
			dto.setImageFileName(fileName);
			dto.setImageOriginalName(originalFileName);
			userImageList.add(dto);
			System.out.println(dto.toString());
			
			//userUploadService.upload(userImageList);
		}
		
		for(UserUploadDTO dto : userImageList) {
			System.out.println(dto.toString());
		}
		userUploadService.upload(userImageList);
	}
	
	@GetMapping(value = "UploadList")
	public List<UserUploadDTO> uploadList(){
		System.out.println("required: uploadList");
		return userUploadService.uploadList();
	}
	
	
}
