package com.Vendor_Bridge.backend.jwt;

import com.Vendor_Bridge.backend.services.UserService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final JwtService jwtService;
    private final UserService userService; // Your custom UserDetailsService implementation

    public JwtAuthenticationFilter(JwtService jwtService, @Lazy UserService userService) {
        this.jwtService = jwtService;
        this.userService = userService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        // 1. Intercept Authorization Header
        final String authHeader = request.getHeader("Authorization");
        final String jwtToken;
        final String username;

        // 2. Drop out early if no Bearer prefix token formatting matches
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        jwtToken = authHeader.substring(7);
        username = jwtService.extractUsername(jwtToken);

        // 3. Process validation only if user is not already authenticated inside this request thread
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = this.userService.loadUserByUsername(username);

            if (jwtService.isTokenValid(jwtToken, userDetails)) {
                // Generate Spring Context Authentication record token containing Roles
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities()
                );
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                // Mount trusted identity token context to current thread locker
                SecurityContextHolder.getContext().setAuthentication(authToken);
                System.out.println("[JWT Filter] Successfully authenticated secure context path for: " + username);
            }
        }

        // 4. Pass execution forward down the conveyor chain
        filterChain.doFilter(request, response);
    }
}
