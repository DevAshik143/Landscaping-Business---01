$(document).ready(function() {
    function setupNewsletterForm(formId, msgId, submitId) {
      $(formId).on('submit', function (e) {
        var form = $(this);
        var msgElement = form.find(msgId);
        var submitBtn = form.find(submitId);
  
        // Clear previous message and update button text
        msgElement.html('').show();
        submitBtn.html('Processing...').attr('disabled', true);
  
        // Submit form data using AJAX
        $.ajax({
          url: '../../assets/php/newsletter.php',
          type: 'post',
          data: form.serialize(),
          success: function (result) {
            msgElement.html(result).fadeIn(); // Display success message
  
            // Reset form fields
            form[0].reset();
  
            // Reset button text and enable button
            submitBtn.html('Subscribe').attr('disabled', false);
  
            // Clear success message after 5 seconds
            setTimeout(function () {
                msgElement.css('visibility', 'hidden');
            }, 4000); // 4 seconds delay
        },
          error: function () {
            msgElement.html('<span style="color: red;">Error occurred. Please try again later.</span>').fadeIn(); // Display error message if AJAX request fails
  
            // Reset button text and enable button
            submitBtn.html('Subscribe').attr('disabled', false);
          }
        });
  
        e.preventDefault(); // Prevent default form submission
      });
    }
  
    // Setup both newsletter forms
    setupNewsletterForm('#newsletter-form-1', '#msg-1', '#submit-1');
    setupNewsletterForm('#newsletter-form-2', '#msg-2', '#submit-2');
  });  