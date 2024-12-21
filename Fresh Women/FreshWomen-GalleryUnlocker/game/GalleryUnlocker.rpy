# Use this unlock script at your own risk.
# https://f95zone.to/threads/.79740/post-12086813

# Start the deal with the devil
init 666 python:
    # Loop through all awards
    if not award_manager is None:
        for gallery_unlock_item in award_manager.awards:
            if not (renpy.seen_image(gallery_unlock_item.unlock_str)):
                renpy.mark_image_seen(gallery_unlock_item.unlock_str)
                gallery_unlock_item.unlock()
    
    # Loop through Alyssa's gallery
    if not gallery_renders is None:
        for gallery_unlock_item in range(0, len(gallery_renders)):
            if not str(gallery_unlock_item) in persistent.gallery_unlock:
                persistent.gallery_unlock.append(str(gallery_unlock_item))