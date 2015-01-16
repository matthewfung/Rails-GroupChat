class WorldController < ApplicationController
  def index
  end

  def new
  end

  def create
  end

  def world
  	topo = File.read("app/assets/javascripts/world.json");
  	render json: topo
  end
end
