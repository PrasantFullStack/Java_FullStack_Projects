package com.prashant.apna.bazar.utils;

import java.io.File;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class FileUploadUtil {

	private static final Logger logger = LoggerFactory.getLogger(FileUploadUtil.class);

	public static final String BASE_UPLOAD_DIR = System.getProperty("user.dir") + "/uploads/";

	// return base path
	public static String getUploadDirFor(String folderName) {

		// directory path creation
		String path = BASE_UPLOAD_DIR + folderName + "/";
		File directory = new File(path);

		// check if the directory already exists, else create it
		if (!directory.exists()) {
			boolean isCreated = directory.mkdirs();

			// error handling
			if (!isCreated) {

				logger.error("Could not create upload directory:" + path);
			}
			// logging on success
			logger.info("Created upload directory:" + path);

		}

		// path return statement
		return path;
	}

}
