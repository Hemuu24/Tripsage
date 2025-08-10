-- Sample data for TripSage platform
-- Run this after setting up the database structure

-- Insert sample profiles (these would normally be created by auth.users)
INSERT INTO public.profiles (id, username, full_name, bio, avatar_url, location, travel_style, languages, interests) VALUES
  ('11111111-1111-1111-1111-111111111111', 'traveler_jane', 'Jane Smith', 'Adventure seeker and photography enthusiast', '/images/placeholder-user.jpg', 'San Francisco, CA', 'Adventure', ARRAY['English', 'Spanish'], ARRAY['Photography', 'Hiking', 'Food']),
  ('22222222-2222-2222-2222-222222222222', 'world_explorer', 'Mike Johnson', 'Solo traveler exploring the world', '/images/placeholder-user.jpg', 'New York, NY', 'Solo', ARRAY['English'], ARRAY['Culture', 'History', 'Local Food']),
  ('33333333-3333-3333-3333-333333333333', 'budget_traveler', 'Sarah Wilson', 'Budget travel expert and hostel lover', '/images/placeholder-user.jpg', 'Austin, TX', 'Budget', ARRAY['English', 'French'], ARRAY['Budget Travel', 'Hostels', 'Street Food']);

-- Insert sample journal posts
INSERT INTO public.posts (id, user_id, title, content, images, location, tags, likes_count, comments_count) VALUES
  ('44444444-4444-4444-4444-444444444444', '11111111-1111-1111-1111-111111111111', 'Amazing Sunset in Bali', 'Just witnessed the most incredible sunset at Tanah Lot temple. The colors were absolutely breathtaking! This place is a must-visit for anyone traveling to Bali.', ARRAY['/images/bali-temple.png'], 'Bali, Indonesia', ARRAY['journal', 'Bali', 'Sunset', 'Temple'], 15, 3),
  ('55555555-5555-5555-5555-555555555555', '22222222-2222-2222-2222-222222222222', 'Hiking in the Swiss Alps', 'Spent the day hiking through the beautiful Swiss Alps. The views were incredible and the fresh mountain air was invigorating. Highly recommend this experience!', ARRAY['/images/swiss-alps.png'], 'Swiss Alps, Switzerland', ARRAY['journal', 'Switzerland', 'Hiking', 'Mountains'], 23, 7),
  ('66666666-6666-6666-6666-666666666666', '33333333-3333-3333-3333-333333333333', 'Street Food Adventure in Tokyo', 'Explored the amazing street food scene in Tokyo today. From ramen to takoyaki, every bite was delicious. The food culture here is incredible!', ARRAY['/images/tokyo-street.png'], 'Tokyo, Japan', ARRAY['journal', 'Tokyo', 'Food', 'Street Food'], 18, 5);

-- Insert sample forum posts
INSERT INTO public.posts (id, user_id, title, content, images, location, tags, likes_count, comments_count) VALUES
  ('77777777-7777-7777-7777-777777777777', '11111111-1111-1111-1111-111111111111', 'Best time to visit Iceland?', 'Planning a trip to Iceland and wondering about the best time to visit. I want to see the Northern Lights but also want to avoid extreme weather. Any recommendations?', NULL, 'Iceland', ARRAY['forum', 'Iceland', 'Northern Lights', 'Planning'], 12, 8),
  ('88888888-8888-8888-8888-888888888888', '22222222-2222-2222-2222-222222222222', 'Solo travel safety tips for women', 'I''m planning my first solo trip to Europe and would love to hear from experienced solo travelers about safety tips, especially for women. What are your must-know safety practices?', NULL, 'Europe', ARRAY['forum', 'Solo Travel', 'Safety', 'Women Travelers'], 34, 15),
  ('99999999-9999-9999-9999-999999999999', '33333333-3333-3333-3333-333333333333', 'Budget accommodation in Paris', 'Looking for affordable but safe accommodation options in Paris. Any recommendations for budget hotels or hostels that are well-located and clean?', NULL, 'Paris, France', ARRAY['forum', 'Paris', 'Budget', 'Accommodation'], 21, 11);

-- Insert sample comments
INSERT INTO public.comments (id, post_id, user_id, content) VALUES
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '77777777-7777-7777-7777-777777777777', '22222222-2222-2222-2222-222222222222', 'I visited Iceland in March and it was perfect! Cold enough for snow but not extreme, and great Northern Lights visibility.'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '77777777-7777-7777-7777-777777777777', '33333333-3333-3333-3333-333333333333', 'September is also a great time - less crowds and still good weather for exploring.'),
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', '88888888-8888-8888-8888-888888888888', '11111111-1111-1111-1111-111111111111', 'Always stay in well-lit areas at night and trust your instincts. I''ve traveled solo throughout Europe and felt very safe.'),
  ('dddddddd-dddd-dddd-dddd-dddddddddddd', '99999999-9999-9999-9999-999999999999', '22222222-2222-2222-2222-222222222222', 'I stayed at a hostel near Montmartre that was clean and safe. Book in advance during peak season!');

-- Insert sample post likes
INSERT INTO public.post_likes (id, post_id, user_id) VALUES
  ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', '44444444-4444-4444-4444-444444444444', '22222222-2222-2222-2222-222222222222'),
  ('ffffffff-ffff-ffff-ffff-ffffffffffff', '44444444-4444-4444-4444-444444444444', '33333333-3333-3333-3333-333333333333'),
  ('gggggggg-gggg-gggg-gggg-gggggggggggg', '55555555-5555-5555-5555-555555555555', '11111111-1111-1111-1111-111111111111'),
  ('hhhhhhhh-hhhh-hhhh-hhhh-hhhhhhhhhhhh', '77777777-7777-7777-7777-777777777777', '33333333-3333-3333-3333-333333333333');
