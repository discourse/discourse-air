# frozen_string_literal: true

RSpec.describe "Core features", type: :system do
  before { upload_theme_or_component }

  it_behaves_like "having working core features"
end
