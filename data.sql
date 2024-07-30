USE [InstituteOfFineArts.Data]
GO
DELETE FROM Awards;
DBCC CHECKIDENT ('[InstituteOfFineArts.Data].dbo.Awards', RESEED, 0);
GO
DELETE FROM Competitions;
DBCC CHECKIDENT ('[InstituteOfFineArts.Data].dbo.Competitions', RESEED, 0);
GO
DELETE FROM Submissions;
DBCC CHECKIDENT ('[InstituteOfFineArts.Data].dbo.Submissions', RESEED, 0);
GO
DELETE FROM Exhibitions;
DBCC CHECKIDENT ('[InstituteOfFineArts.Data].dbo.Exhibitions', RESEED, 0);
GO
DELETE FROM ExhibitionPaintings;
DBCC CHECKIDENT ('[InstituteOfFineArts.Data].dbo.ExhibitionPaintings', RESEED, 0);
GO
DELETE FROM Results;
DBCC CHECKIDENT ('[InstituteOfFineArts.Data].dbo.Results', RESEED, 0);
GO
DELETE FROM AspNetRoles;
GO
DELETE FROM AspNetUserRoles;
GO
DELETE FROM AspNetUsers;
GO

INSERT INTO AspNetUsers(Id, Address, Avatar, Gender, StartDate, UserName, FullName, PasswordHash, PhoneNumber, Email, BirthDate, Status, EmailConfirmed, PhoneNumberConfirmed, TwoFactorEnabled, LockoutEnabled, AccessFailedCount, NormalizedUserName)
VALUES
('thiet', N'606 - Nguyễn Văn Quá - Phường Đông Hưng Thuận - Quận 12', 'thiet123.jpg', 'Nam', '2021-08-08 10:00:00', 'thiet123', N'Nguyễn Huy Thiết', 'AQAAAAEAACcQAAAAEEJ65c22lq8l8SfQ3MXEmBi3F9yvXLU0QxMTy+bCxOvSkyxI6rU/j/fPgGGUWzH9cg==', '0123456789', 'thiet123@gmail.com', '2000-01-01 10:00:00', 1, 1, 1, 1, 1, 1,'THIET123'),
('phong', N'Địa chỉ của User Phong', 'phong123.jpg', 'Nam', '2021-08-08 10:00:00', 'phong123', N'Mai Bùi Tấn Phong', 'AQAAAAEAACcQAAAAEHqNsMPE4lx8Z+8PCeHrz4I9EifJr0jvCELYu+OnRNLv6eYyB34OaXK9zkgHSRNxyA==', '0123456789', 'phong123@gmail.com', '2000-01-01 10:00:00', 1, 1, 1, 1, 1, 1, 'PHONG123'),
('hiu', N'606 - Nguyễn Văn Quá - Phường Đông Hưng Thuận - Quận 12', 'hiu123.jpg', 'Nam', '2021-08-08 10:00:00', 'hiu123', N'Hoàng Trung Hỉu', 'AQAAAAEAACcQAAAAEGGNr1/iwyJRSEmeGA4EAMdjdgHIWZ4fAjMPPdpSF3CZSfF/9lVV0NqYouwTkZWcRA==', '0123456789', 'hiu123@gmail.com', '2000-01-01 10:00:00', 1, 1, 1, 1, 1, 1, 'HIU123'),
('bao', N'606 - Nguyễn Văn Quá - Phường Đông Hưng Thuận - Quận 12', 'bao123.jpg', 'Nam', '2021-08-08 10:00:00', 'bao123', N'Nguyễn Quốc Bảo', 'AQAAAAEAACcQAAAAEGGNr1/iwyJRSEmeGA4EAMdjdgHIWZ4fAjMPPdpSF3CZSfF/9lVV0NqYouwTkZWcRA==', '0123456789', 'bao123@gmail.com', '2000-01-01 10:00:00', 1, 1, 1, 1, 1, 1, 'BAO123'),
('admin', N'Địa chỉ của Admin', 'admin123.jpg', 'Nam', '2021-08-08 10:00:00', 'admin123', N'Nguyễn Văn Admin', 'AQAAAAEAACcQAAAAEBoB2XUeGd8tmpTXnbWmukbC7m/FI0yAx1DLJ6mIC2WSpzojTHghpVZZMbi4Xlyf4Q==', '0123456789', 'admin123@gmail.com', '2000-01-01 10:00:00', 1, 1, 1, 1, 1, 1,'ADMIN123'),
('teacher', N'Địa chỉ của teacher', 'teacher123.jpg', N'Nữ', '2021-08-08 10:00:00', 'teacher123', N'Hoàng Thị Teacher', 'AQAAAAEAACcQAAAAEEkNOCV4gJP3NnHTLCVFi5g9lTpvoQnsJNXa4gyhCnYJaAFP2FjC8CeTMJZllD9wuQ==', '0123456789', 'teacher123@gmail.com', '2000-01-01 10:00:00', 1, 1, 1, 1, 1, 1,'TEACHER123'),
('phuoc', N'Địa chỉ của thầy phước', 'phuoc123.jpg', N'Nữ', '2021-08-08 10:00:00', 'phuoc123', N'Dương Hữu Phước', 'AQAAAAEAACcQAAAAEEkNOCV4gJP3NnHTLCVFi5g9lTpvoQnsJNXa4gyhCnYJaAFP2FjC8CeTMJZllD9wuQ==', '0123456789', 'phuoc123@gmail.com', '2000-01-01 10:00:00', 1, 1, 1, 1, 1, 1,'PHUOC123'),
('hien', N'Địa chỉ của hiển', 'hien123.jpg', 'Nam', '2021-08-08 10:00:00', 'hien123', N'Nguyễn Văn Hiễn', 'AQAAAAEAACcQAAAAEEkNOCV4gJP3NnHTLCVFi5g9lTpvoQnsJNXa4gyhCnYJaAFP2FjC8CeTMJZllD9wuQ==', '0123456789', 'hien123@gmail.com', '2000-01-01 10:00:00', 1, 1, 1, 1, 1, 1,'HIEN123'),
('khang', N'Địa chỉ của Khang', 'khang123.jpg', 'Nam', '2021-08-08 10:00:00', 'khang123', N'Nguyễn Vi Khang', 'AQAAAAEAACcQAAAAEEkNOCV4gJP3NnHTLCVFi5g9lTpvoQnsJNXa4gyhCnYJaAFP2FjC8CeTMJZllD9wuQ==', '0123456789', 'khang123@gmail.com', '2000-01-01 10:00:00', 1, 1, 1, 1, 1, 1,'KHANG123'),
('dat', N'Địa chỉ của Đạt', 'dat123.jpg', 'Nam', '2021-08-08 10:00:00', 'dat123', N'Nguyễn Văn Đạt', 'AQAAAAEAACcQAAAAEEkNOCV4gJP3NnHTLCVFi5g9lTpvoQnsJNXa4gyhCnYJaAFP2FjC8CeTMJZllD9wuQ==', '0123456789', 'dat123@gmail.com', '2000-01-01 10:00:00', 1, 1, 1, 1, 1, 1,'DAT123'),
('manager', N'Địa chỉ của manager', 'manager123.jpg', N'Nữ', '2021-08-08 10:00:00', 'manager123', N'Lê Văn manager', 'AQAAAAEAACcQAAAAEEkNOCV4gJP3NnHTLCVFi5g9lTpvoQnsJNXa4gyhCnYJaAFP2FjC8CeTMJZllD9wuQ==', '0123456789', 'manager123@gmail.com', '2000-01-01 10:00:00', 1, 1, 1, 1, 1, 1,'MANAGER123');

INSERT INTO AspNetRoles (Id, Name, ConcurrencyStamp, NormalizedName) 
                  VALUES('user', 'User','user', 'USER' ),
				        ('teacher', 'Teacher','teacher', 'TEACHER' ),
						('manager', 'Manager','manager', 'MANAGER' ),
						('student','Student','student','STUDENT'),
						('admin', 'Admin','admin', 'ADMIN' );
INSERT INTO AspNetUserRoles(RoleId, UserId) VALUES 
('admin','admin'), 
('teacher','teacher'), 
('teacher','phuoc'), 
('manager', 'manager'), 
('student', 'thiet'),  
('student', 'khang'),
('student', 'dat'),
('student', 'hien'),
('student', 'hiu'),
('student','bao'),
('user', 'phong');

INSERT INTO Competitions(Name, StartDate, EndDate, Description, Image, Status, UserId) 
VALUES (N'Di sản Việt Nam qua hội họa','2023-11-11 00:00:00','2023-11-30 23:59:59',N'Hội Di sản văn hóa Việt Nam tổ chức phát động Cuộc thi vẽ tranh với chủ đề Di sản văn hóa Việt Nam qua hội họa tại trường Đại học Mỹ thuật Thành phố Hồ Chí Minh.','1.jpg', 1 ,'teacher'),
	   (N'Vẽ Tranh Truyền Thống và Văn Hóa','2023-10-17 00:00:00','2023-11-07 23:59:59',N'Cuộc thi khuyến khích sinh viên thể hiện tài năng vẽ dựa trên các yếu tố truyền thống và văn hóa. Có thể bao gồm vẽ tranh đông hồ, tranh dân gian, hoặc tái hiện lại văn hóa, truyền thống của Việt Nam qua tranh vẽ.','2.jpg', 1 ,'teacher'), 
	   (N'Vẽ Bút Chì','2023-10-02 00:00:00','2023-10-29 23:59:59',N' Cuộc thi này thúc đẩy sinh viên thể hiện tài năng nghệ thuật đương đại thông qua vẽ, điêu khắc, hoặc các dạng nghệ thuật sáng tạo khác. Các chủ đề có thể bao gồm sự đa dạng văn hóa, môi trường, công nghệ, hoặc chủ đề tự do để khích lệ sự sáng tạo.','3.jpg', 1 ,'teacher'), 
	   (N'Nghệ Thuật Đương Đại cho Sinh Viên','2023-11-5 00:00:00','2023-12-08 23:59:59',N'Cuộc thi tập trung vào việc sử dụng bút chì để tái hiện các yếu tố truyền thống, văn hóa hoặc cổ điển. Sinh viên có thể thể hiện khả năng kỹ thuật vẽ bút chì cũng như kiến thức về các yếu tố văn hóa truyền thống.','4.jpg', 1 ,'teacher'),
	   (N'Vẽ tranh Tự do','2023-10-30 00:00:00','2023-11-14 23:59:59',N'Một cuộc thi tập trung vào sự sáng tạo của sinh viên, cho phép họ thể hiện ý tưởng, cảm xúc và tài năng vẽ tranh.','5.jpg', 1 ,'teacher'),
	   (N'nét vẽ Sinh viên: Thành phố trong trái tim','2023-11-30 00:00:00','2023-12-24 23:59:59',N'Yêu cầu sinh viên vẽ tranh thể hiện cái nhìn của họ về thành phố, với mục tiêu tạo ra các tác phẩm độc đáo và phản ánh cái đẹp của thành phố theo góc nhìn cá nhân.','6.jpg', 1 ,'teacher'),
	   (N'Tranh vẽ Sáng tạo','2023-11-11 00:00:00','2023-11-28 23:59:59',N'Một cuộc thi khuyến khích sinh viên thể hiện hành trình nghệ thuật của họ thông qua các tác phẩm tranh vẽ tay.','7.jpg', 1 ,'teacher'),
	   (N'Sinh viên và Nét vẽ Độc đáo','2023-11-26 00:00:00','2023-12-18 23:59:59',N'Một cuộc thi dành cho sinh viên thể hiện nét vẽ độc đáo và tài năng sáng tạo của họ qua các tác phẩm tranh vẽ tự do.','8.jpg', 1 ,'teacher');
INSERT INTO Submissions(Name, Description, Price, ImagePath, SubmissionDate, Quote, UserId, CompetitionId) VALUES 
(N'“Tháp rùa Hồ Gươm”, Hà Nội.', N'là một tác phẩm nghệ thuật vẽ minh họa về cảnh quan nổi tiếng tại Hà Nội, bằng chất liệu màu nước, màu tempera và sơn acrylic. ', '300000', '1.jpg','2023-11-22 00:00:00', N'Tôi nhìn Tháp Rùa trên bức tranh, nét vẽ mềm mại như ánh chiều buông dần. Hồ Gươm trải dài, màu nước yên bình như giấc mơ. Tranh vẽ tạo ra không gian tĩnh lặng, nơi mà thời gian dường như ngưng trôi."', 'hiu' , 1),
(N'“Nhà thờ”, Đà Nẵng.', N'Bức tranh "Nhà thờ" ở Đà Nẵng thể hiện một trong những công trình tôn giáo nổi tiếng tại Đà Nẵng, thường được biết đến là Nhà thờ Con Gà (hay còn gọi là Nhà thờ Chính tòa Đức Mẹ Vô Nhiễm). ', '300000', '2.jpg','2023-11-23 00:00:00', N'"Nhà thờ truyền giáo, trong bức tranh thu hút mắt người bởi vẻ đẹp kiến trúc tinh xảo. Cao vút giữa bãi biển xanh biếc và những dãy núi lấp lánh. Chúa Giêsu trên đỉnh tháp, như một bức tranh tĩnh lặng giữa nhịp sống sôi động của Đà Nẵng."', 'hiu' , 2),
(N'Phố cổ Hội An.', N'Bức tranh thể hiện không gian đặc trưng của một trong những điểm du lịch lịch sử và văn hóa nổi tiếng ở Việt Nam. ', '300000', '3.jpg','2023-11-20 00:00:00', N'"Bức tranh Phố Cổ Hội An là hình ảnh cổ kính và yên bình. Những ngôi nhà cổ với mái ngói đỏ, đường phố đá xanh mượt, cùng với sự rực rỡ của các đèn lồng tạo nên bức tranh tĩnh lặng và đầy màu sắc. Nơi đây còn là biểu tượng của văn hóa truyền thống và sự giàu có văn hóa ẩm thực của người dân Hội An."', 'hiu' , 3),
(N'“Hồ Trúc Bạch”, Hà Nội.', N'Bức tranh thể hiện một phần của không gian công cộng yên bình và đẹp đẽ tại thủ đô Hà Nội, Việt Nam.', '300000', '4.jpg','2023-11-20 00:00:00', N'"Bức tranh Hồ Trúc Bạch tĩnh lặng và đẹp đẽ. Bên bờ hồ, hàng trúc bạch xanh mướt uốn quanh, nhẹ nhàng nhưng đầy ẩn chứa sự thanh thoát. Ánh nắng hoàng hôn nhẹ nhàng bao trùm hồ, tạo ra không gian yên bình, đặc trưng cho vẻ đẹp thơ mộng của Hà Nội."', 'hiu' , 4),

(N'Hà Nội Rong', N'Bức tranh thể hiện một góc phố phường của thủ đô Hà Nội với hình ảnh của người bán rong trên các con phố.', '300000', '5.jpg','2023-11-08 00:00:00', N'Các gian hàng di động bán đủ loại hàng hóa từ đồ ăn, đồ dùng đến hàng thủ công, đều phản ánh sự sôi động, màu sắc của cuộc sống hàng ngày tại thủ đô.', 'bao' , 1),
(N'Cuộc Sống Của Người Dân Vùng Cao', N'Bức tranh thể thể hiện nhiều khía cạnh khác nhau của cuộc sống hàng ngày và văn hóa đặc trưng của họ.', '300000', '6.jpg','2023-11-02 00:00:00', N'Bức tranh thể hiện cuộc sống hằng ngày của một cộng đồng dân tộc qua các hoạt động mua bán, giao lưu và trao đổi hàng hóa với nhau.', 'bao' , 2),
(N'Múa Lân', N'Bức tranh thể hiện một phần của nền văn hóa truyền thống ở Việt Nam, đặc biệt là trong các ngày lễ lớn như Tết Nguyên Đán (Tết).', '300000', '7.jpg','2023-11-05 00:00:00', N'Hình ảnh con lân được vẽ sống động, với màu sắc rực rỡ, vui mừng, và tươi vui, thể hiện sự may mắn và niềm vui.', 'bao' , 3),
(N'Lớp 5 Dưới Lòng Đất', N'Bức tranh thể thể hiện một khía cạnh đặc biệt trong lịch sử Việt Nam, đặc biệt là thời kỳ chiến tranh và nạn mù chữ.', '300000', '8.jpg','2023-10-22 00:00:00', N'Trong thời kỳ chiến tranh, nạn mù chữ là một trong những vấn đề nghiêm trọng khi các em học sinh bị phải học hành dưới lòng đất, trong hang động để tránh khỏi bom đạn và hiểm nguy từ cuộc chiến tranh.', 'bao' , 4),

(N'Lớp Trung Học Đầu Tiên', N'Bức tranh thể sự kiên trì của học sinh và giáo viên trong việc duy trì môi trường học tập và tinh thần học tập trong thời kỳ khó khăn và nguy hiểm.', '300000', '9.jpg','2023-10-27 00:00:00', N'Bức tranh diễn tả sự kiên trì của học sinh, dù ở trong hoàn cảnh khó khăn, họ vẫn cố gắng học tập để vươn lên và xây dựng tương lai sáng hơn.', 'thiet' , 1),
(N'Chung Cư', N'Bức tranh thể thể hiện cảnh quan của một khu chung cư chật chội với tòa nhà cao tầng, cùng các căn hộ, các tiện ích và cuộc sống hàng ngày của cư dân. ', '300000', '10.jpg','2023-11-22 00:00:00', N'Đây thường là biểu tượng của đô thị hiện đại với các tòa nhà cao, được xây dựng để đáp ứng nhu cầu ở và làm việc của nhiều người dân trong các thành phố lớn.', 'thiet' , 2),
(N'Gia Đình Chuột', N'Bức tranh sử dụng các đường nét trừu tượng, hình học và sự biến dạng để tạo ra một chân dung có phong cách độc đáo.', '300000', '11.jpg','2023-11-26 00:00:00', N'Bức tranh có thể không tái hiện chân thực về hình dáng chuột mà tập trung vào việc thể hiện tình yêu thương và mối quan hệ trong gia đình chuột thông qua ngôn ngữ trừu tượng và cảm xúc.', 'thiet' , 3),
(N'Miền Yêu Thương', N'Bức tranh thể thể hiện sự yên bình, hạnh phúc và niềm vui từ việc sống trong miền đất được yêu thích.', '300000', '12.jpg','2023-12-07 00:00:00', N'"Trong mỗi đường cong của sông nước, tôi tìm thấy nụ cười của miền yêu thương, nơi mà trái tim hòa mình với thiên nhiên và con người."', 'thiet' , 4),

(N'“Sen Việt."', N'Bức tranh là một tác phẩm nghệ thuật độc đáo, tôn vinh vẻ đẹp của hoa sen - biểu tượng văn hóa của Việt Nam.', '300000', '13.jpg','2023-11-20 00:00:00', N'Với sử dụng tinh tế của sơn mài tự nhiên, tranh thể hiện sự rực rỡ, sự tươi vui và vẻ đẹp tinh khiết của hoa sen nở rộ trên mặt nước, tạo nên một cảm giác yên bình và thanh tao đặc trưng của cảnh quan Việt Nam.', 'hiu' , 5),
(N'“Bạch Liên."', N'"Bạch Liên" thường được hiểu là hoa sen trắng trong văn hóa Việt Nam. Đây là biểu tượng của sự thuần khiết, tinh khiết và sự hoàn hảo trong đạo Phật.', '300000', '14.jpg','2023-11-20 00:00:00', N'"Đây thường là một bức tranh sơn mài, sử dụng sơn mài tự nhiên để tạo nên các chi tiết tinh sắc, màu sắc rực rỡ', 'khang' , 5),
(N'“Câu cá."', N'Bức tranh mô tả một cảnh vật với người câu cá đang thực hiện hoạt động câu cá trên sông, thể hiện sự tĩnh lặng và yên bình, với người câu cá tập trung vào việc tung cần, chờ đợi một cách kiên nhẫn.', '300000', '15.jpg','2023-11-20 00:00:00', N'Tranh sử dụng các màu sắc tươi sáng để tái hiện cảnh nắng vàng chiếu xuống mặt nước, tạo ra sự rọi sáng và ánh bóng trên bề mặt nước.', 'thiet' , 5),
(N'“Nắng Ban Mai."', N'Bức tranh mô tả một khung cảnh buổi sáng sớm, khi ánh nắng mặt trời đầu ngày bắt đầu len lỏi qua cảnh vật.', '300000', '16.jpg','2023-11-20 00:00:00', N'Bức tranh thông qua việc sử dụng kỹ thuật in ấn để tái tạo lại trên vật liệu như giấy, vải, hay các chất liệu in khác.', 'khang' , 3),

(N'“Bitexco."', N'Bức tranh thể hiện một trong những biểu tượng cũ của thành phố Hồ Chí Minh và là một trong những tòa nhà cao nhất Việt Nam.', '300000', '17.jpg','2023-11-20 00:00:00', N'Với kỹ thuật vẽ chì, người họa sĩ đã tái hiện chi tiết của kiến trúc, các đường nét xung quanh của tòa nhà, cũng như ánh sáng và bóng đổ để tạo ra một bức tranh sống động và chân thực.', 'khang' , 2),
(N'“Khu phố."', N'Một bức tranh vẽ màu về khu phố thể hiện một góc phố, một khu dân cư với những ngôi nhà, cửa hàng, và hoạt động của con người. ', '300000', '18.jpg','2023-11-20 00:00:00', N'Kỹ thuật vẽ màu sử dụng bút màu, pastel, hoặc sơn nước để tạo ra sự sống động và màu sắc tươi tắn cho bức tranh.', 'hiu' , 7),
(N'“Quận 1"', N'Bức tranh về Quận 1 với kỹ thuật vẽ màu nước thể hiện một phần của trung tâm thành phố Hồ Chí Minh với những cảnh quan đô thị, kiến trúc đặc trưng, và sự sôi động của cuộc sống hàng ngày.', '300000', '19.jpg','2023-11-20 00:00:00', N'Bức tranh về Quận 1 được tạo ra bằng kỹ thuật vẽ màu nước, thể hiện một góc nhìn sống động về trung tâm đô thị của Hồ Chí Minh.', 'khang' , 7),
(N'“Góc nhìn Thủ Đức"', N'Bức tranh vẽ màu nước về góc nhìn từ Thủ Đức sang quận 1 thể hiện một phần của khu vực với cảnh quan đô thị, các dãy nhà phố, công trình kiến trúc.', '300000', '20.jpg','2023-11-20 00:00:00', N'Kỹ thuật vẽ màu nước sử dụng để tạo ra sự mềm mại và tươi sáng cho cảnh vật. ', 'dat' , 7),

(N'"Nhà Thờ Đức Bà."', N'Bức tranh thể hiện vẻ đẹp cổ kính và tinh tế của công trình kiến trúc lịch sử này.', '300000', '21.jpg','2023-11-20 00:00:00', N'Kỹ thuật vẽ màu nước thường được sử dụng để tạo ra sự mềm mại và tươi sáng trong việc tái hiện các chi tiết kiến trúc, đường nét, và màu sắc của Nhà Thờ Đức Bà.', 'dat' , 4),
(N'"Bình Minh Sau Núi."', N'Bức tranh được vẽ trên vải lanh với chất liệu sơn dầu, tranh vẽ cảnh đồi núi trùng trùng điệp điệp yên bình.', '300000', '22.jpg','2023-11-20 00:00:00', N'Tranh được vẽ theo phong cách hiện đại với những chi tiết, đường nét được vẽ nổi mang đến cho người xem cảm giác chân thực, muốn hòa mình vào với không gian của tấm tranh.', 'dat' , 1),
(N'“Cơn Mưa Mùa Thu."', N'là tranh sơn dầu phong cảnh đang chào đón mùa thu về, tranh mang phong cách lãng mạn với tone màu ấm áp rỡ…', '300000', '23.jpg','2023-11-20 00:00:00', N'Kỹ thuật sơn dầu được sử dụng để tái hiện chân thực cảm giác sâu và động của cơn mưa, với những giọt mưa rơi nhẹ nhàng xuống mặt đất hoặc những vùng nước.', 'hien' , 4),
(N'“Dòng Sông Dưới Chân Núi."', N'Bức tranh được vẽ trên vải lanh với chất liệu sơn dầu, tranh vẽ cảnh đồi núi trùng trùng điệp điệp yên bình. ', '300000', '24.jpg','2023-11-20 00:00:00', N'Tranh được vẽ theo phong cách hiện đại với những chi tiết, đường nét được vẽ nổi mang đến cho người xem cảm giác chân thực, muốn hòa mình vào với không gian của tấm tranh.', 'dat' ,3),

(N'“Tranh gạo."', N'Tranh từ gạo được tạo ra bằng cách sử dụng các tấm gạo tự nhiên để tạo ra tranh vẽ.', '300000', '25.jpg','2023-11-20 00:00:00', N'Các tấm gạo được sắp xếp theo màu sắc hoặc kích thước khác nhau để tạo nên các chi tiết và hình ảnh khác nhau.', 'khang' , 4),
(N'“Tranh cát."', N'Tranh cát là loại hình nghệ thuật độc đáo, trong đó cát được sử dụng để tạo ra các hình ảnh, bức tranh hoặc cảnh vật.', '300000', '26.jpg','2023-11-20 00:00:00', N'Người nghệ sĩ sẽ sử dụng cát với nhiều màu sắc khác nhau để tạo ra các chi tiết, sắc thái và tạo độ sâu cho tranh.', 'hiu' , 3),
(N'“Tranh lá."', N'Tranh lá thường mang lại một cái nhìn tự nhiên, gần gũi với thiên nhiên và có thể tạo ra các tác phẩm nghệ thuật độc đáo với sự sáng tạo của người nghệ sĩ.', '300000', '27.jpg','2023-11-20 00:00:00', N'Người nghệ sĩ sử dụng lá cây tự nhiên với các màu sắc, kích thước, và hình dạng khác nhau để tạo ra các hình ảnh hoặc cảnh quan. ', 'hien' , 2),
(N'“tranh con sò."', N'Tranh con sò là một loại hình nghệ thuật độc đáo, trong đó vỏ con sò được sử dụng để tạo ra các hình ảnh, tranh vẽ hoặc các tác phẩm nghệ thuật khác. ', '300000', '28.jpg','2023-11-20 00:00:00', N'Người nghệ sĩ sử dụng vỏ sò với các kích thước, hình dạng và màu sắc khác nhau để tạo ra các chi tiết và hình ảnh.', 'khang' , 1);


INSERT INTO Results(Rating, PositivePoint, Limitation, ImprovementArea, UserId, SubmissionId) VALUES 
(5, N'Sáng tạo và phong phú về màu sắc.', N'Còn thiếu sự phong phú và đa dạng trong việc thể hiện chi tiết.', N'Nâng cao việc sắp xếp không gian và thể hiện sự kỹ lưỡng trong từng chi tiết.', 'teacher', 1),
(4, N'Sự tập trung vào chi tiết tạo nên một cảm giác chân thực.', N'Sự sắp xếp không gian và phối hợp màu sắc còn chưa đồng nhất, tạo ra sự không cân đối.', N'Cần thay đổi cách tiếp cận sử dụng màu sắc và ánh sáng để tạo ra một hiệu ứng mạnh mẽ hơn.', 'phuoc', 1),
(3, N'Bức tranh thể hiện một cảnh vật hoặc chủ đề độc đáo và mới mẻ.', N'Việc sử dụng màu sắc cần được điều chỉnh để tạo sự hài hòa và cân đối hơn.', N'Tăng tính đa dạng và phong phú trong cách sử dụng màu sắc và ánh sáng.', 'teacher', 2),
(4, N'Kỹ thuật vẽ tay khéo léo và tỉ mỉ.', N'Có thể cải thiện về việc truyền đạt cảm xúc và ý nghĩa rõ ràng hơn.', N'Cần phát triển sự độc đáo và sáng tạo để tạo nên một góc nhìn riêng biệt hơn.', 'phuoc', 2),
(2, N'Tạo dựng không gian và chiều sâu tốt.', N'Thiếu sự cân đối trong việc sử dụng màu sắc.', N'Điều chỉnh thêm về cân đối màu sắc hoặc ánh sáng.', 'teacher', 3),
(1, N'Nắm bắt tốt tông màu và ánh sáng.', N'Cần cải thiện phần thể hiện sáng tạo và tính độc đáo trong góc nhìn.', N'Hãy thể hiện cảm xúc và ý nghĩa một cách sâu sắc và rõ ràng hơn thông qua bức tranh.', 'phuoc', 3),
(5, N'Bức tranh phản ánh sự biểu cảm sâu sắc và tâm trạng chân thực của người tạo ra.', N'Có sự thiếu cân đối trong việc sử dụng màu sắc, làm giảm tính thẩm mỹ và điểm nhấn chung của tác phẩm.', N'Cần thêm sự cân đối và tương phản màu sắc để làm nổi bật và hấp dẫn hơn.', 'teacher', 4),
(3, N'Bức tranh thể hiện sự tỉ mỉ và công phu trong từng đường nét.', N'Bức tranh có thể cần thêm chiều sâu hoặc các yếu tố gây ấn tượng hơn.', N'Cần thêm sự cân đối và tương phản màu sắc để làm nổi bật và hấp dẫn hơn.', 'phuoc', 4),

(3, N'Có sự sáng tạo và phong cách riêng biệt, tạo nên bức tranh độc đáo và thu hút.', N'Chi tiết không rõ ràng hoặc thiếu sự chính xác trong phác thảo.', N'Thử các kỹ thuật mới hoặc phương pháp để làm phong phú hơn bức tranh.', 'teacher', 5),
(2, N'Bức tranh này thể hiện sự sáng tạo mạnh mẽ qua việc sử dụng màu sắc và chi tiết.', N'Sự thiếu tỷ lệ và đối xứng trong việc sắp xếp các yếu tố chính của bức tranh.', N'Tăng tính sáng tạo bằng việc mở rộng phạm vi màu sắc và chi tiết.', 'phuoc', 5),
(5, N'Có sự sáng tạo trong việc sử dụng ánh sáng và màu sắc để tạo ra bức tranh sống động.', N'Thiếu sự độc đáo và sáng tạo trong việc diễn đạt ý nghĩa của tác phẩm.', N'Hãy tập trung hơn vào việc phát triển chi tiết hoặc không gian.', 'teacher', 6),
(4, N'Có cảm nhận tốt về việc sử dụng không gian và cấu trúc bức tranh.', N'Có sự thiếu đối xứng trong cách sử dụng màu sắc, làm giảm tính thẩm mỹ của tác phẩm.', N'Cân nhắc việc sử dụng màu sắc đột phá hoặc hiệu ứng đặc biệt để làm nổi bật tác phẩm.', 'phuoc', 6),
(5, N'Sử dụng màu sắc và ánh sáng một cách sáng tạo và hiệu quả.', N'Sự lệch lạc trong tỷ lệ và mối quan hệ giữa các yếu tố trong bức tranh.', N'Tăng tính chân thực và sâu sắc bằng cách điều chỉnh tỉ lệ và mối quan hệ giữa các yếu tố trong bức tranh.', 'teacher', 7),
(5, N'Nét vẽ và chi tiết thể hiện sự tự nhiên và sống động.', N'Việc truyền đạt cảm xúc chưa rõ ràng và mạnh mẽ qua bức tranh.', N'Hãy tập trung vào việc truyền đạt cảm xúc mạnh mẽ và rõ ràng hơn qua từng nét vẽ và sắp xếp màu sắc.', 'phuoc', 7),
(5, N'Cách người tạo ra diễn đạt cảm xúc rõ ràng qua việc vẽ và sử dụng màu sắc.', N'Một số phần của bức tranh có thể cần sự linh hoạt hoặc sự kỹ thuật tốt hơn.', N'Đặt nhiều tập trung vào việc diễn đạt thông điệp hoặc cảm xúc mà bạn muốn truyền tải qua bức tranh.', 'teacher', 8),
(3, N'Tích cực trong việc thể hiện chi tiết và sự tỉ mỉ trong từng nét vẽ.', N'Thiếu sự độc đáo và sáng tạo trong cách diễn đạt cảm xúc và ý nghĩa của bức tranh.', N'Phát triển ý tưởng và sáng tạo để diễn đạt cảm xúc và ý nghĩa sâu sắc hơn trong bức tranh.', 'phuoc', 8),

(5, N'Sự sáng tạo và độ phong phú trong việc sử dụng kỹ thuật vẽ.', N'Có sự thiếu cân đối trong việc sử dụng ánh sáng, làm giảm điểm nhấn và tác động chung của bức tranh.', N'Nâng cao khả năng biểu cảm và tạo động lực sâu sắc hơn thông qua cách sử dụng màu sắc và chi tiết.', 'teacher', 9),
(4, N'Bức tranh thể hiện sự biểu cảm và cảm xúc sâu sắc từ người tạo ra.', N'Sự lệch lạc và thiếu cân đối trong cách sử dụng ánh sáng có thể giảm điểm mạnh của bức tranh.', N'Điều chỉnh tỉ lệ và mối quan hệ giữa các yếu tố để tạo ra một bức tranh cân đối hơn.', 'phuoc', 9),
(5, N'Cách diễn đạt ý tưởng hoặc thông điệp trong bức tranh rất rõ ràng và ấn tượng.', N'Cần cân nhắc việc điều chỉnh tỷ lệ và mối quan hệ giữa các phần của bức tranh để tạo ra sự cân đối hơn.', N'Sử dụng nét vẽ và ánh sáng để truyền đạt cảm xúc mạnh mẽ và rõ ràng hơn.', 'teacher', 10),
(4, N'Bức tranh thể hiện sự sáng tạo qua việc sử dụng màu sắc và góc nhìn độc đáo.', N'Có sự thiếu cân đối trong việc sử dụng ánh sáng, làm giảm điểm nhấn và tác động chung của bức tranh.', N'Phát triển ý tưởng và sáng tạo trong cách diễn đạt cảm xúc và ý nghĩa của bức tranh.', 'phuoc', 10),
(5, N'Bức tranh phản ánh sự biểu cảm sâu sắc và tâm trạng chân thực của người tạo ra.', N'Việc truyền đạt cảm xúc chưa rõ ràng và mạnh mẽ qua bức tranh còn cần được cải thiện.', N'Hãy tập trung vào việc cân đối màu sắc và ánh sáng để tạo ra một không gian hài hòa và thu hút hơn.', 'teacher', 11),
(4, N'Tích cực trong việc thể hiện chi tiết và sự tỉ mỉ trong từng nét vẽ.', N'Sự thiếu cân đối trong việc sử dụng đối lập màu sắc hoặc ánh sáng có thể tạo ra sự lệch lạc hoặc không cân đối.', N'Nâng cao thêm về khả năng biểu cảm hay sử dụng màu sắc để tăng tính sáng tạo và độ phong phú.', 'phuoc', 11),
(5, N'Cách người tạo ra diễn đạt cảm xúc rõ ràng qua việc vẽ và sử dụng màu sắc.', N'Một số phần trong bức tranh có thể cần phác thảo chính xác hơn để làm rõ ràng hơn về các chi tiết.', N'Tập trung vào việc xây dựng nền tảng kỹ thuật hoặc phác thảo vững chắc hơn để cải thiện sự chính xác và chi tiết trong bức tranh.', 'teacher', 12),
(4, N'Bức tranh thể hiện sự sáng tạo qua việc sử dụng màu sắc và góc nhìn độc đáo.', N'Sự sử dụng màu sắc có thể được nâng cao để tăng tính thẩm mỹ và độ phong phú của tác phẩm.', N'Thử nghiệm và áp dụng các kỹ thuật mới hoặc cách tiếp cận khác để làm phong phú hơn các yếu tố trong bức tranh.', 'phuoc', 12);


INSERT INTO Awards([Order], NameAward, UserId, CompetitionId) VALUES
(1, N'10.000.000 và học bổng toàn phần', 'hiu', 1),
(2, N'5.000.000 và quà', 'bao', 1),
(3, N'2.000.000 và quà', 'thiet', 1),

(1, N'20.000.000 và vé tham dự cuộc thi vẽ Việt Nam', 'thiet', 2),
(2, N'10.000.000 và vé tham dự cuộc thi vẽ Việt Nam', 'bao', 2),
(3, N'5.000.000 và quà', 'thiet', 2),

(1, N'5.000.000 và quà', 'thiet',3),
(2, N'2.000.000 và quà', 'bao', 3),
(3, N'1.000.000 và quà', 'hiu', 3),

(1, N'2.000.000 và quà', 'bao',4),
(2, N'1.000.000 và quà', 'hiu', 4),
(3, N'500.000 và quà', 'thiet', 4),

(1, N'7.000.000 và quà', 'bao',4),
(2, N'3.000.000 và quà', 'hiu', 4),
(3, N'1.000.000 và quà', 'thiet', 4),

(1, N'30.000.000 và quà', 'thiet',4),
(2, N'10.000.000 và quà', 'hiu', 4),
(3, N'5.000.000 và quà', 'bao', 4),

(1, N'7.000.000 và quà', null, 5),
(2, N'3.000.000 và quà', null, 5),
(3, N'1.000.000 và quà', null, 5),

(1, N'7.000.000 và quà', null, 6),
(2, N'3.000.000 và quà', null, 6),
(3, N'1.000.000 và quà', null, 6),

(1, N'7.000.000 và quà', null, 7),
(2, N'3.000.000 và quà', null, 7),
(3, N'1.000.000 và quà', null, 7),

(1, N'7.000.000 và quà', null, 8),
(2, N'3.000.000 và quà', null, 8),
(3, N'1.000.000 và quà', null, 8);

INSERT INTO Exhibitions(Name, StartDate, EndDate, Description, Status, Image, UserId) VALUES
(N'Tranh Dân Gian Việt Nam','2023-10-10 07:00:00','2023-11-10 23:59:59',N'Triển lãm tập trung trưng bày tranh dân gian từ các vùng miền khác nhau của Việt Nam. Các tác phẩm thường thể hiện đời sống hàng ngày, truyền thống, hình ảnh văn hóa, cảnh đẹp tự nhiên và các câu chuyện dân gian qua nét vẽ sáng tạo của người dân nghệ sĩ.', 1, '1.jpg', 'teacher'),
(N'Tranh Đông Hồ truyền thống','2023-10-20 07:00:00','2023-11-20 23:59:59',N' Triển lãm trưng bày các bức tranh độc đáo từ làng Đông Hồ ở Bắc Ninh, Việt Nam. Các tác phẩm thường mang phong cách dân gian, sử dụng màu sắc sặc sỡ, và thể hiện nhiều nét văn hóa, truyền thống của người Việt.', 1, '2.jpg', 'teacher'),
(N'Tranh Đương Đại Việt Nam','2023-11-02 07:00:00','2023-12-02 23:59:59',N'Triển lãm giới thiệu các tác phẩm tranh đương đại của các họa sĩ Việt Nam. Các tác phẩm thường phản ánh sự tiến bộ, tương tác với xã hội, và đôi khi có sự kết hợp giữa truyền thống văn hóa và phong cách hiện đại trong nghệ thuật.', 1, '3.jpg', 'teacher'),
(N'Nghệ thuật Đương đại: Sắc màu Đô thị','2023-11-04 07:00:00','2023-12-04 23:59:59',N'Một triển lãm tranh tập trung vào nghệ thuật đương đại, thể hiện sự đa dạng và sự phong phú của cuộc sống đô thị qua tranh vẽ.', 1, '4.jpg', 'teacher'),
(N'Tranh cảnh Đẹp: Tình yêu Thiên nhiên','2023-11-06 07:00:00','2023-12-06 23:59:59',N'Triển lãm này tập trung vào tranh vẽ cảnh đẹp, từ thiên nhiên đến cảnh quan đô thị, thể hiện tình yêu và sự kỳ diệu của thiên nhiên.', 1, '5.jpg', 'teacher'),
(N'Tranh Trừu tượng: Nét vẽ Độc đáo','2023-11-10 07:00:00','2023-12-10 23:59:59',N'Một triển lãm tập trung vào nghệ thuật tranh trừu tượng, thể hiện sự sáng tạo và độc đáo của nét vẽ từ các nghệ sĩ đương đại.', 1, '6.jpg', 'teacher'),
(N'Nghệ thuật Nghệ nhân Trẻ: Tranh vẽ Tự do','2023-11-27 07:00:00','2023-12-24 23:59:59',N'Triển lãm này giới thiệu các tác phẩm tranh từ các nghệ sĩ trẻ, thể hiện sự sáng tạo và cái nhìn mới lạ trong nghệ thuật.', 1, '7.jpg', 'teacher'),
(N'Tranh Văn hóa Dân gian: Hành trình Nghệ thuật','2023-12-01 07:00:00','2023-01-04 20:00:00',N'Một triển lãm đặc biệt thể hiện tranh vẽ văn hóa dân gian, từ các nét vẽ truyền thống đến những tác phẩm hiện đại lấy cảm hứng từ văn hóa dân gian.', 1, '8.jpg', 'teacher'),
(N'Tranh Sơn Dầu Việt Nam','2023-11-25 07:00:00','2023-12-24 23:59:59',N'Triển lãm tập trung vào tranh sơn dầu do các họa sĩ Việt Nam sáng tạo. Các tác phẩm thường có kỹ thuật vẽ tinh xảo, sử dụng sơn dầu để tái hiện cảnh vật, người và đôi khi có cả sự trừu tượng.', 1, '9.jpg', 'teacher');

INSERT INTO ExhibitionPaintings(PaintingName, Price, IsSold, Description, SubmissionId, ExhibitionId, Image) VALUES
(N'Tháp rùa Hồ Gươm”, Hà Nội.', 30000, 1, N'là một tác phẩm nghệ thuật vẽ minh họa về cảnh quan nổi tiếng tại Hà Nội, bằng chất liệu màu nước, màu tempera và sơn acrylic.', 1, 1, '1.jpg' ),
(N'“Nhà thờ”, Đà Nẵng.', 30000, 1, N'Bức tranh "Nhà thờ" ở Đà Nẵng thể hiện một trong những công trình tôn giáo nổi tiếng tại Đà Nẵng, thường được biết đến là Nhà thờ Con Gà (hay còn gọi là Nhà thờ Chính tòa Đức Mẹ Vô Nhiễm).', 3, 1, '2.jpg' ),
(N'Phố cổ Hội An.', 30000, 1, N'Bức tranh thể hiện không gian đặc trưng của một trong những điểm du lịch lịch sử và văn hóa nổi tiếng ở Việt Nam.', 5, 1, '3.jpg' ),
(N'"Hồ Trúc Bạch”, Hà Nội."', 30000, 1, N'Bức tranh thể hiện một phần của không gian công cộng yên bình và đẹp đẽ tại thủ đô Hà Nội, Việt Nam.', 7, 1, '4.jpg' ),

(N'Hà Nội Rong.', 30000, 1, N'Bức tranh thể hiện một góc phố phường của thủ đô Hà Nội với hình ảnh của người bán rong trên các con phố.', 2, 2, '5.jpg' ),
(N'Cuộc Sống Của Người Dân Vùng Cao.', 30000, 1, N'Bức tranh thể thể hiện nhiều khía cạnh khác nhau của cuộc sống hàng ngày và văn hóa đặc trưng của họ.', 4, 2, '6.jpg' ),
(N'Chung Cư.', 30000, 1, N'Bức tranh thể thể hiện cảnh quan của một khu chung cư chật chội với tòa nhà cao tầng, cùng các căn hộ, các tiện ích và cuộc sống hàng ngày của cư dân.', 6, 2, '7.jpg' ),
(N'Múa Lân.', 30000, 1, N'Bức tranh thể hiện một phần của nền văn hóa truyền thống ở Việt Nam, đặc biệt là trong các ngày lễ lớn như Tết Nguyên Đán (Tết).', 8, 2, '8.jpg' ),

(N'Lớp Trung Học Đầu Tiên', 30000, 1, N'Bức tranh thể thể hiện một khía cạnh đặc biệt trong lịch sử Việt Nam, đặc biệt là thời kỳ chiến tranh và nạn mù chữ.', 12, 3, '9.jpg' ),
(N'Lớp 5 Dưới Lòng Đất', 30000, 1, N'Bức tranh có thể hiện sự kiên trì của học sinh và giáo viên trong việc duy trì môi trường học tập và tinh thần học tập trong thời kỳ khó khăn và nguy hiểm.', 9, 3, '10.jpg' ),
(N'Gia Đình Chuột', 30000, 1, N'Bức tranh sử dụng các đường nét trừu tượng, hình học và sự biến dạng để tạo ra một chân dung có phong cách độc đáo.', 10, 3, '11.jpg' ),
(N'Miền Yêu Thương', 30000, 1, N'Bức tranh thể thể hiện sự yên bình, hạnh phúc và niềm vui từ việc sống trong miền đất được yêu thích.', 11, 3, '12.jpg' );
