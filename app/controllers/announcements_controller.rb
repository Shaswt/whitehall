class AnnouncementsController < PublicFacingController

  def index
    @announced = AnnouncementsFilter.new
    @results = @announced.announcements
  end

private

  class AnnouncementsFilter
    def announcements
      @announcements ||= (
        announcements = Edition
        announcements = announcements.by_type([NewsArticle, Speech])
        announcements = announcements.published
        announcements = announcements.by_first_published_at
        announcements.reverse
      )
    end
  end
end
